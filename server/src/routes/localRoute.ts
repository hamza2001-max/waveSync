import { Router } from "express";
import { login, logout } from "../controllers/localController";
import { deleteAllUsers, getAllUsers } from "../dummy/userDummy";
import { register } from "../controllers/localController";
import { upload } from "../utils/multer";

const userRouter = Router();

// Testing
userRouter.get("/getAllUsers", getAllUsers);
userRouter.delete("/deleteAllUsers", deleteAllUsers);

userRouter.post("/register", upload.single("profileImage"), register, login);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

export default userRouter;
