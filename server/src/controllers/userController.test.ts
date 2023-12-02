import { app } from "../index";
import request from "supertest";
import { prisma } from "../utils/client";

jest.mock("bcrypt", () => ({
  genSalt: jest.fn(() => "mocked-salt"),
  hash: jest.fn(() => "mocked-hash"),
}));

jest.useFakeTimers();
describe("User Registeration API", () => {
  it("should create a new user successfully", async () => {
    const userData = {
      fullname: "John joe",
      username: "joeJohn",
      email: "john@example.com",
      password: "password123",
      profileImage: "image.jpg",
      roles: {
        create: [{ name: "client" }],
      },
    };

    prisma.user.findFirst = jest.fn().mockResolvedValue(null);
    prisma.user.create = jest.fn().mockResolvedValue({ ...userData });

    const response = await request(app)
      .post("/user/register")
      .send(userData)
      .expect(200);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: {
        OR: [{ email: userData.email }, { username: userData.username }],
      },
    });

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: userData.email,
        fullname: userData.fullname,
        username: userData.username,
        password: "mocked-hash",
        profileImage: null,
        roles: {
          create: [{ name: "client" }],
        },
      },
    });
    expect(response.body).toEqual({ ...userData });
  });

  it("should handle the case, if the email/username already exists", async () => {
    const userData = {
      fullname: "John joe",
      username: "existingUname",
      email: "existingEmail@example.com",
      password: "password123",
      profileImage: "image.jpg",
      roles: {
        create: [{ name: "client" }],
      },
    };
    prisma.user.findFirst = jest.fn().mockResolvedValue({
      id: 1,
      ...userData,
    });
    const response = await request(app).post("/user/register").send(userData);
    expect(response.body).toEqual({
      message: expect.stringMatching(
        /A user with this email already exists\.|The username is taken\./
      ),
    });
    expect(response.status).toEqual(409);
  });
});
