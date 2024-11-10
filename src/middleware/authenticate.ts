//Create Middleware for Protecting Routes

import { Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
// import { JwtPayload } from "../types/jwtPayload";
import { AuthenticatedRequest } from "../types/express/AuthenticatedRequest";

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  // const token = authHeader && authHeader.split(" ")[1]; // Bearer token
  const token = authHeader; // without Bearer token

  if (!token) {
    res.status(401).json({ message: "Access token missing" });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded) {
      console.log(err);
      if (err instanceof TokenExpiredError) {
        return res
          .status(401)
          .json({ message: "Token expired. Please log in again." });
      }
      res.status(403).json({ message: "Invalid token" });
      return;
    }
    req.user = decoded as {
      userId: number;
      role: string;
      iat: number;
      exp: number;
    };
    next();
  });
};
