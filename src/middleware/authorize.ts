//Implement Role-Based Authorization

import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/express/AuthenticatedRequest";

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
};
