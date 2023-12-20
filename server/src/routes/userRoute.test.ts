import { app } from "../index";
import { prisma } from "../utils/client";
import request from "supertest";
import bcrypt from "bcrypt";

jest.mock("bcrypt");
const userData = {
  email: "john@example.com",
  password: "password123",
};
describe("User Logout API", () => {
  it("should logs user out successfully.", async () => {
    const expectedData = {
      userId: 46,
      profileImage: null,
      fullname: "johnathen",
      username: "aTheName",
      email: "john@example.com",
      password: "password123",
      createdAt: "2023-10-25T12:14:08.462Z",
      updatedAt: "2023-10-25T12:14:08.462Z",
    };
    prisma.user.findFirst = jest.fn().mockReturnValue({ ...expectedData });
    (bcrypt.compare as jest.Mock).mockReturnValue(true);
    const agent = request.agent(app);
    const loginResponse = await agent.post("/user/login").send(userData).expect(200);
    expect(loginResponse.body).toEqual({
      message: "Authentication successful.",
    });
    const logoutResponse = await agent.post("/user/logout");
    expect(logoutResponse.body).toEqual({ message: "Logged out successfully." });
  });

  it("should return an error, when a user is not logged in.", async () => {
    const response = await request(app).post("/user/logout").expect(400);
    expect(response.body).toEqual({ message: "User is not logged in." });
  });
});
