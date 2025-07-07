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

export const getUserByID = async (
  req: Request,
  res: Response
): Promise<any> => {
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

export const getUsersByQuery = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { query } = req.query;

  try {
    if (!query) {
      const users = await db.user.findMany();
      return res.json(users);
    }

    const users = await db.user.findMany({
      where: {
        OR: [
          {
            username: query as string,
          },
          {
            email: query as string,
          },
          {
            nickname: query as string,
          },
        ],
      },
    });

    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { username, nickname, password, confirmPassword, email } = req.body;

  if (!username || !nickname || !password || !confirmPassword || !email)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Bad data provided." });

  if (username.length < 4)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Minimum username length is 4" });

  if (password !== confirmPassword)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Confirmation password not valid." });

  try {
    // Check if user exists
    const userExists = await db.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });

    if (userExists)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "User sudah terdaftar" });

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
        nickname,
        email,
      },
    });

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "new user registered", user: newUser });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  if (!req.body || !id)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Need id or empty changes" });

  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: req.body,
    });
    res.json({ newData: user });
  } catch (error) {
    console.log(error);
  }
};
