import { Request, Response, RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../models/user";

export const signUp: RequestHandler = async (req: Request, res: Response) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  // Check if user exists
  const existingUser = await User.findOne({
    where: { username: req.body.username },
  });
  if (existingUser) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  await User.create({
    username: req.body.username,
    password: hashedPassword,
    role: "user",
  });

  res.status(201).json({ message: "User registered successfully" });
};

export const logIn = async (req: Request, res: Response) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    // Find user
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Check password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
