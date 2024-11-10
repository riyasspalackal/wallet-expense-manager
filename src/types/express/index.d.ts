// src/types/express/index.d.ts
// Define a Custom Interface for the User Payload
// Create an interface that represents the structure of your user object, including the role property.
// src/types/express/index.d.ts

import { JwtPayload } from "../jwtPayload";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Explanation:

// Namespace Declaration: Extends the Express Request interface to include a user property of type JwtPayload.
// JwtPayload Interface: Represents the JWT payload structure, including userId, role, iat (issued at), and exp (expiration time).
// Note: Create a new folder src/types/express/ and place the index.d.ts file there. This is a common practice for extending global types in TypeScript.

// 2. Update Your tsconfig.json
// Ensure TypeScript includes the types directory in the compilation process.
