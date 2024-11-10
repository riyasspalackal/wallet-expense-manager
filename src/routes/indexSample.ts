import { Router, Request, Response } from "express";
import userRouter from "./users";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Home Page!");
});

router.get("/about", (req: Request, res: Response) => {
  res.send("About Page");
});

router.get("/contact", (req: Request, res: Response) => {
  res.send("Contact Page");
});

router.get("/users/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId;
  res.send(`User ID: ${userId}`);
});

router.get("/search", (req: Request, res: Response) => {
  const term = req.query.term;
  res.send(`Search Term: ${term}`);
});

//Example with multiple handlers
// •	path: Same as above.
// •	middleware functions: Any number of middleware functions can be used before the final handler.
// •	These functions receive (req, res, next) and can perform operations like logging, validation, or modifying the request before it reaches the handler.
// •	handler: The final function to send the response to the client.
router.get(
  "/example",
  (req, res, next) => {
    console.log("Middleware 1");
    next();
  },
  (req, res, next) => {
    console.log("Middleware 2");
    next();
  },
  (req, res) => {
    res.send("Hello from the final handler!");
  }
);

// Use user router
router.use("/users", userRouter);

export default router;
