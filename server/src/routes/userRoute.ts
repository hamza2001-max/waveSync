import { Router } from "express";
import { login, logout, register } from "../controllers/userController";
import { upload } from "../utils/multer";
import { prisma } from "../utils/client";

const userRouter = Router();

// Testing
userRouter.get("/getAllUsers", async (req, res) => {
  try {
    console.log("req.user ", req.user);
    if (!req.user) {
      throw new Error("You are not authorized.");
    }
    const allUsers = await prisma.user.findMany();
    res.status(200).send(allUsers);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// userRouter.delete("/deleteAllUsers", async (req, res) => {
//   await prisma.user.deleteMany();
//   res.sendStatus(200);
// });
// Testing

userRouter.post("/register", upload.single("profileImage"), register, login);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
