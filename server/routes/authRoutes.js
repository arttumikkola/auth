const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const router = express.Router();

passport.use(
  new LocalStrategy(
    {
      usernameField: "usernameOrEmail",
      passwordField: "password",
    },
    async function verify(usernameOrEmail, password, cb) {
      try {
        let query;
        if (usernameOrEmail.includes("@")) {
          // If the input contains '@', treat it as an email address
          query = "SELECT * FROM users WHERE email = ?";
        } else {
          // Otherwise, treat it as a username
          query = "SELECT * FROM users WHERE username = ?";
        }

        const [results] = await db.execute(query, [usernameOrEmail]);

        if (results.length === 0) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }

        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Registration endpoint
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser =
      (await User.findByEmailOrUsername(email)) ||
      (await User.findByEmailOrUsername(username));
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await User.createUser(username, email, hashedPassword);

    res.status(201).json({ message: "User created." });
  } catch (error) {
    console.error("An error occurred during registration:", error);
    res.status(500).json({ message: "An error occurred." });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      // No user found or wrong credentials
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        console.error("Error during login:", loginErr);
        return res.status(500).json({ message: "Error logging in" });
      }
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ message: "Session save error" });
        }
        console.log("req.session", req.session);

        res.status(200).json({
          message: "Logged in successfully",
          user: {
            id: user.id,
            username: user.username,
          },
        });
      });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      req.session.destroy((err) => {
        if (err) {
          console.error("Failed to destroy session:", err);
          return res.status(500).json({ message: "Failed to destroy session" });
        }
        res.clearCookie("connect.sid", {
          path: "/",
          httpOnly: true,
          secure: false,
          domain: "localhost",
        });
        res.status(200).json({ isAuthenticated: false, message: "Logged out" });
      });
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

module.exports = router;
