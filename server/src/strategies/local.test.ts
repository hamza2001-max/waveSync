import { app } from "../index";
import request from "supertest";
describe("Passport Local Strategy", () => {
  it("should send an error when an email is not provided", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ password: "password123$" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Missing credentials" });
  });
  
  it("should send an error when password is not provided", async () => {
    const response = await request(app)
      .post("/user/login")
      .send({ email: "email@gmail.com" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Missing credentials" });
  });
});
