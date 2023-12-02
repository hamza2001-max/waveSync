import { Request, Response } from "express";
import { prisma } from "../utils/client";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, username, email, password } = req.body;
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


    const createdUser = await prisma.user.create({
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
    res.status(200).send(createdUser);
  } catch (error: any) {
    res.status(409).send({ message: error.message });
  }
};