import { app } from "../index";
import { prisma } from "../utils/client";
import request from "supertest";
import bcrypt from "bcrypt";

jest.mock("bcrypt");
const userData = {
  email: "john@example.com",
  password: "password123",
};

describe("Passport Local Strategy", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mock("bcrypt");
  });
  it("should authenticate a user with valid credentials.", async () => {
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
    const response = await request(app).post("/user/login").send(userData);
    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: {
        email: userData.email,
      },
    });
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ message: "Authentication successful." });
  });

  it("should return an error with an incorrect password.", async () => {
    (bcrypt.compare as jest.Mock).mockReturnValue(false);
    const response = await request(app)
      .post("/user/login")
      .send(userData)
      .expect(400);
    expect(response.body).toEqual({ message: "Wrong Password." });
  });

  it("should return an error with a non-exiting user.", async () => {
    prisma.user.findFirst = jest.fn().mockReturnValue(null);
    const response = await request(app)
      .post("/user/login")
      .send(userData)
      .expect(400);
    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: {
        email: userData.email,
      },
    });
    expect(response.body).toEqual({ message: "User doesn't exists." });
  });

  it("should return an error with missing email.", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ password: "password123$" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Missing credentials" });
  });

  it("should return an error with missing password.", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ email: "email@gmail.com" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Missing credentials" });
  });
});
