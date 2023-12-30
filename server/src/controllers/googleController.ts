import { Request, Response } from "express";
import passport from "passport";

export const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});

export const googleAuthCBFailed = (_: Request, res: Response) => {
  res.status(400).send({ message: "Failed" });
};

export const googleAuthCB = (req: Request, res: Response) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/failed",
    },
    async (err, user, info) => {
      if (err) {
        return res.status(500).send({ error: "Internal Server Error." });
      }
      if (!user) {
        return res.status(400).send({ message: info.message });
      }
      req.logIn(user, function () {
        return res
          .cookie("email", user.emails[0].value, {
            sameSite: "none",
            secure: true,
          })
          .status(200)
          .json({ message: "Authentication successful." });
      });
    }
  )(req, res);
};
