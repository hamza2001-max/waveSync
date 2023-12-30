import { Router } from "express";
import {
  googleAuth,
  googleAuthCB,
  googleAuthCBFailed,
} from "../controllers/googleController";
import "../strategies/google";

const googleRouter = Router();
googleRouter.get("/failed", googleAuthCBFailed);
googleRouter.get("/google", googleAuth);
googleRouter.get("/google/callback", googleAuthCB);

export default googleRouter;
