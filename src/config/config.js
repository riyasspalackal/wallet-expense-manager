// src/config/config.js

require("dotenv").config(); // Load environment variables
console.log("------------------------------------");
console.log("CONFIG/CONFIG.JS");
console.log("------------------------------------");
module.exports = {
  development: {
    username: process.env.DB_USERNAME || "my_app_user",
    password: process.env.DB_PASSWORD || "your_password",
    database: process.env.DB_NAME || "my_app_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  // You can add configurations for 'test' and 'production' environments
};
