import { Router } from "express";
import { register } from "../controllers/userController";
import { upload } from "../utils/multer";
import passport from "passport";
import { prisma } from "../utils/client";

const userRouter = Router();


userRouter.get("/getAllUsers", async(req, res) => {
    const allUsers = await prisma.user.findMany();
    res.status(200).send(allUsers);
})

userRouter.delete("/deleteAllUsers", async(req, res) => {
    await prisma.user.deleteMany();
    res.sendStatus(200);
})


userRouter.post("/register", upload.single("profileImage"), register);
userRouter.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(200).send({message: "login func"});
});

// userRouter.post("/login", (req, res) => {
//     passport.authenticate("local", (error: any, user: any) => {
//       if (error) {
//         res.status(500).send({ message: `Internal Server Error: ${error}` });
//       }
//       if (!user) {
//         res.status(401).send({ message: "Authentication Failed." });
//       } else {
//         res.status(200).send({ message: "login func" });
//       }
//     });
//   });
export default userRouter;
