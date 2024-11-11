// tests/user.test.ts

import request from "supertest";
import app from "../src/app";
import { User } from "../src/models/user";

jest.mock("../src/models/User");
jest.mock("jsonwebtoken");
describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /user/profile", () => {
    it("should return user profile for authenticated user", async () => {
      // Mock User.findByPk
      (User.findByPk as jest.Mock).mockResolvedValue({
        userId: 1,
        role: "user",
      });

      const response = await request(app)
        .get("/users/profile")
        .set("Authorization", "Bearer valid_token");

      expect(response.status).toBe(200);

      expect(response.body.user).toEqual({
        userId: 1,
        role: "user",
      });
      await User.findByPk(1, {
        attributes: ["userId", "role"],
      });

      expect(User.findByPk).toHaveBeenCalledWith(1, {
        attributes: ["userId", "role"],
      });
    });

    it("should return 401 if not authenticated", async () => {
      const response = await request(app).get("/users/profile");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Access token missing");
    });
  });
});
