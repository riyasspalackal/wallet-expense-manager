// src/routes/users.ts

import { Router, Response, NextFunction } from "express";
import { authenticateJWT, authorizeRoles } from "../../middleware";
import { AuthenticatedRequest } from "../../types/express/AuthenticatedRequest";

const userRouter = Router();

userRouter.get(
  "/profile",
  authenticateJWT,
  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.json({ message: "User profile", user: req.user });
  }
);

userRouter.get(
  "/admin",
  authenticateJWT,
  authorizeRoles("admin"),
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) next(new Error());
    res.json({ message: "Admin panel", user: req.user });
    // this below function is used to throw error to errorHandler
    // next(new Error());
  }
);

export default userRouter;
