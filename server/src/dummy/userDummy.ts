import { Request, Response } from "express";
import { prisma } from "../utils/client";

export const getAllUsers = async (req: Request, res: Response) => {
  console.log("req.user ", req.user);
  
  try {
    if (!req.user) {
      throw new Error("You are not authorized.");
    }
    const allUsers = await prisma.user.findMany();
    res.status(200).send(allUsers);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export const deleteAllUsers = async (_: Request, res: Response) => {
  await prisma.user.deleteMany();
  res.sendStatus(200);
};
