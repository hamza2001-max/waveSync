import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { profileImage, fullname, username, email, password } = req.body;
  console.log(profileImage, fullname, username, email, password);
  res.status(200);
};
