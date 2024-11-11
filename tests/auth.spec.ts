// tests/auth.test.ts

import request from "supertest";
import app from "../src/app"; // Adjust the import path
import { User } from "../src/models/user";

jest.mock("../src/models/User");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Authentication Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /auth/signup", () => {
    it("should register a new user", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue({
        id: 1,
        username: "testuser",
        role: "user",
      });

      const response = await request(app).post("/auth/signup").send({
        username: "testuser",
        password: "testpass",
        role: "admin",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User registered successfully");
      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: "testuser" },
      });
      expect(User.create).toHaveBeenCalledWith(
        expect.objectContaining({
          username: "testuser",
          password: "hashed_testpass",
          role: "user",
        })
      );
    });

    it("should return 409 if user already exists", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        id: 1,
        username: "testuser",
      });

      const response = await request(app).post("/auth/signup").send({
        username: "testuser",
        password: "testpass",
        role: "admin",
      });

      expect(response.status).toBe(409);
      expect(response.body.message).toBe("User already exists");
    });
  });

  describe("POST /auth/login", () => {
    it("should log in an existing user", async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        id: 1,
        username: "testuser",
        password: "hashed_testpass",
        role: "user",
      });

      const response = await request(app).post("/auth/login").send({
        username: "testuser",
        password: "testpass",
      });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe("test_jwt_token");
      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: "testuser" },
      });
    });

    it("should return 401 for invalid credentials", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post("/auth/login").send({
        username: "invaliduser",
        password: "invalidpass",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid credentials");
    });
  });
});
