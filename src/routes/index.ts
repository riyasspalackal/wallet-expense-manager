import { Router, Request, Response } from "express";
import userRouter from "./users";
import authRouter from "./auth";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Home Page!");
});

// Use user router
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
