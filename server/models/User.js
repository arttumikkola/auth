const db = require("../db/db");

const User = {
  findByEmailOrUsername: async (usernameOrEmail) => {
    const query = `
            SELECT * FROM users
            WHERE email = ? OR username = ?
            LIMIT 1;
        `;

    const [results] = await db.query(query, [usernameOrEmail, usernameOrEmail]);
    return results.length ? results[0] : null;
  },

  createUser: async (username, email, hashedPassword) => {
    const query = `
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?);
        `;

    const [result] = await db.query(query, [username, email, hashedPassword]);
    return result.insertId;
  },

  getUserIdFromDatabase: async (usernameOrEmail) => {
    const query = `
            SELECT id FROM users
            WHERE email = ? OR username = ?
            LIMIT 1;
        `;

    const [results] = await db.query(query, [usernameOrEmail, usernameOrEmail]);
    return results.length ? results[0].id : null;
  },

  findById: async (id) => {
    console.log("Starting findById for ID:", id);
    const query = `SELECT * FROM users WHERE id = ? LIMIT 1;`;
    try {
      const [results] = await db.query(query, [id]);
      console.log("Query executed. Results:", results);
      if (results.length) {
        console.log("User found:", results[0]);
        return results[0];
      } else {
        console.log("No user found for ID:", id);
        return null;
      }
    } catch (error) {
      console.error("Error in findById:", error);
      throw error; // Make sure to rethrow the error so it can be caught in deserializeUser
    }
  },
};

module.exports = User;
