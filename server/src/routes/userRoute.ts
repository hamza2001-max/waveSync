import { Router } from "express";
import { register } from "../controllers/userController";
import { upload } from "../utils/multer";

const userRouter = Router();
userRouter.post("/register", upload.single("profileImage"), register);
export default userRouter;
