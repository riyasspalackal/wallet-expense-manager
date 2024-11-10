// src/middleware/index.ts

import { authenticateJWT } from "./authenticate";
import { authorizeRoles } from "./authorize";
import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`logger - ${req.method} ${req.url}`);
  next();
};

export { authenticateJWT, authorizeRoles, logger };
