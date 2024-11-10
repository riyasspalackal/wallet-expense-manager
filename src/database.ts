// src/database.ts

import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
  username: process.env.DB_USERNAME || "my_app_user",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "my_app_db",
  logging: false,
  models: [User], // or [__dirname + '/models'] if you have multiple models
});
