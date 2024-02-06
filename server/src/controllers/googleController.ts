import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
  prompt: "select_account",
  includeGrantedScopes: true,
});

export const googleAuthCBFailed = (_: Request, res: Response) => {
  res.status(400).send({ message: "Authentication failed." });
};

export const googleAuthCB = (req: Request, res: Response) => {
  passport.authenticate(
    "google",
    { successReturnToOrRedirect: "/success", failureRedirect: "/failed" },
    async (err, user, info) => {
      if (err) return res.status(500).send({ error: "Internal Server Error." });
      if (!user) return res.status(400).send({ message: info.message });
      const { userId, password, updatedAt, ...userData } = user;
      const formatedData = {
        ...userData,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      };
      req.logIn(user, function () {
        res
          .cookie("email", user.email, {
            sameSite: "none",
            secure: true,
          })
          .status(200);
        res.redirect(
          `http://localhost:5173?auth=google&email=${formatedData.email}&fullname=${formatedData.fullname}&profileImage=${formatedData.profileImage}&username=${formatedData.username}&createdAt=${formatedData.createdAt}`
        );
      });
    }
  )(req, res);
};
