const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bcrypt = require("bcrypt");
const db = require("./db/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000", // or true if you want to copy the origin of the request
    credentials: true, // this allows session cookies to be sent back and forth
    methods: ["GET", "POST", "PUT", "DELETE"], // if you need other methods, include them here
    allowedHeaders: ["Content-Type", "Authorization"], // if you use custom headers, they need to be listed here
  })
);

app.use(express.json());

const sessionStore = new MySQLStore(
  {
    createDatabaseTable: true,
    expiration: 86400000,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires_at",
        data: "data",
      },
    },
  },
  db
);

app.use(
  session({
    key: "connect.sid",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
      secure: false,
      httpOnly: true,
      domain: "localhost",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

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

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  try {
    const [results] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    if (results.length === 0) {
      return cb(null, false);
    }

    const user = results[0];
    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
