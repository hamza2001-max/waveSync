import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/client";
import validator from "validator";
import passport from "passport";
import bcrypt from "bcrypt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fullname, username, email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Provide a valid email.");
    }
    if (!validator.isLength(username, { max: 15, min: 4 })) {
      throw new Error("Username is not of required length (4-15).");
    }
    if (!validator.isLength(fullname, { max: 15, min: 4 })) {
      throw new Error("Full Name is not of required length (4-15).");
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 4,
        minLowercase: 1,
        minUppercase: 1,
      })
    ) {
      throw new Error(
        "Password must be at least 4 characters with at least one uppercase and one lowercase letter."
      );
    }

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (userExists?.email === email)
      throw new Error("A user with this email already exists.");
    if (userExists?.username === username)
      throw new Error("The username is taken.");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        email,
        fullname,
        username,
        password: hash,
        profileImage: req.file?.path ? req.file?.path : null,
        roles: {
          create: [{ name: "client" }],
        },
      },
    });
    next();
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
};

export const login = (req: Request, res: Response) => {
  passport.authenticate("local", function (err: any, user: any, info: any) {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.status(400).send({ message: info.message });
    }
    res.cookie("userId", user.userId, { httpOnly: true });
    req.logIn(user, function () {
      return res.status(200).json({ message: "Authentication successful." });
    });
  })(req, res);
};

export const logout = async (req: Request, res: Response) => {
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
};
