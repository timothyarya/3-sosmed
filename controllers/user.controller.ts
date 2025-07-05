import type { Request, Response } from "express";
import db from "../prisma/db";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

export const validateUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username, password } = req.body;

  if (!username || !password)
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Data not provided" });

  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User tidak terdaftar" });

    if (!(await bcrypt.compare(password, user.password)))
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Password salah!" });

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User tidak terdaftar" });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error);
  }
};
