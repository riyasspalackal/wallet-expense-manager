import router from "./routes";
import express from "express";
import dotenv from "dotenv";

// import { data } from "./jsonFileFromWalletApp";
import { logger } from "./middleware";
import errorHandler from "./middleware/errorHandler";

// console.log(data());

dotenv.config();
const app = express();

// Apply logger middleware to all routes
app.use(logger);

// Middleware to parse JSON bodies
app.use(express.json());

// Use the router
app.use("/", router);

// 404 Catch-All Route (for unmatched routes)
app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

// Error-Handling Middleware (placed at the end)
app.use(errorHandler); // Ensure this is the last `app.use` call

export default app;
