import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { profileImage, fullName, userName, email, password } = req.body;
  console.log(profileImage);
  res.status(200);
};
