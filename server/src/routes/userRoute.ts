import { Router } from "express";
import { register } from "../controllers/userController";
import { upload } from "../utils/multer";
import passport from "passport";
import { prisma } from "../utils/client";

const userRouter = Router();

// Testing
userRouter.get("/getAllUsers", async (req, res) => {
  try {
    console.log("cookie", req.cookies);
    console.log("session", req.session);
    if (!req.user) {
      throw new Error("You are not authorized.");
    }
    const allUsers = await prisma.user.findMany();
    res.status(200).send(allUsers);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

userRouter.delete("/deleteAllUsers", async (req, res) => {
  await prisma.user.deleteMany();
  res.sendStatus(200);
});
// Testing

userRouter.post("/register", upload.single("profileImage"), register);
userRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

userRouter.post("/logout", async (req, res) => {
  try {
    if (!req.user) throw new Error("User is not logged in.");
    req.logout(function (err) {
      if (err) throw new Error(err);
      req.session.destroy(function (err) {
        if (err) throw new Error(err);
        res
          .status(200)
          .clearCookie("connect.sid", { path: "/" })
          .send({ message: "Logged out successfully." });
      });
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

export default userRouter;