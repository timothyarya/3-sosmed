import type { Request, Response } from "express";
import db from "../prisma/db";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import logger from "../utils/logger";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * GET /api/v1/users
 *
 * Fetches all users in the database.
 * @returns {Promise<any>} A JSON response containing all users.
 * @throws {Error} If any error occurs while fetching users.
 */
/*******  efa495ed-55e9-4638-a96d-3133b419dcfd  *******/ export const getUsers =
  async (req: Request, res: Response): Promise<any> => {
    const requestId = (req as any).id; // Assuming you have request ID middleware
    logger.info(`[${requestId}] Fetching all users`);
    try {
      const users = await db.user.findMany();
      logger.info(`[${requestId}] Successfully fetched ${users.length} users`);
      res.json({ success: true, users });
    } catch (error) {
      logger.error(
        `[${requestId}] Error fetching users: ${(error as any).message}`,
        {
          error,
        }
      );
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        msg: "Internal server error",
      });
    }
  };

export const validateUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { username, password } = req.body;
  const requestId = (req as any).id;
  logger.info(`[${requestId}] Validating user credentials for ${username}`);

  if (!username || !password) {
    logger.warn(
      `[${requestId}] Validation failed - missing username or password`
    );
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Data not provided",
    });
  }

  try {
    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user) {
      logger.warn(`[${requestId}] User ${username} not found`);
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: "User tidak terdaftar",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logger.warn(`[${requestId}] Invalid password for user ${username}`);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        msg: "Password salah!",
      });
    }

    logger.info(
      `[${requestId}] Successful authentication for user ${username}`
    );
    res.json({
      success: true,
      msg: "User found",
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error(
      `[${requestId}] Error validating user ${username}: ${
        (error as any).message
      }`,
      { error }
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const getUserByID = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const requestId = (req as any).id;
  logger.info(`[${requestId}] Fetching user by ID: ${id}`);

  try {
    const user = await db.user.findUnique({ where: { id } });

    if (!user) {
      logger.warn(`[${requestId}] User with ID ${id} not found`);
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: "User tidak terdaftar",
      });
    }

    logger.info(
      `[${requestId}] Successfully fetched user ${user.username} (ID: ${id})`
    );
    return res.json({
      success: true,
      msg: "User found",
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error(
      `[${requestId}] Error fetching user ${id}: ${(error as any).message}`,
      {
        error,
      }
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const getUsersByQuery = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { query } = req.query;
  const requestId = (req as any).id;
  logger.info(`[${requestId}] Fetching users by query: ${query}`);

  try {
    if (!query) {
      const users = await db.user.findMany();
      logger.info(
        `[${requestId}] Fetched all ${users.length} users (no query provided)`
      );
      return res.json({
        success: true,
        msg: "All users",
        users: users.map((u) => ({
          id: u.id,
          username: u.username,
          nickname: u.nickname,
          email: u.email,
        })),
      });
    }

    const users = await db.user.findMany({
      where: {
        OR: [
          { username: { contains: query as string } },
          { email: { contains: query as string } },
          { nickname: { contains: query as string } },
        ],
      },
    });

    logger.info(
      `[${requestId}] Found ${users.length} users matching query "${query}"`
    );
    res.json({
      success: true,
      msg: `Users with query ${query}`,
      users: users.map((u) => ({
        id: u.id,
        username: u.username,
        nickname: u.nickname,
        email: u.email,
      })),
    });
  } catch (error) {
    logger.error(
      `[${requestId}] Error searching users with query "${query}": ${
        (error as any).message
      }`,
      { error }
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { username, nickname, password, confirmPassword, email } = req.body;
  const requestId = (req as any).id;
  logger.info(`[${requestId}] Creating new user ${username} (${email})`);

  // Validation checks
  if (!username || !nickname || !password || !confirmPassword || !email) {
    logger.warn(`[${requestId}] Missing required fields for user creation`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Bad data provided.",
    });
  }

  if (username.length < 4) {
    logger.warn(`[${requestId}] Username ${username} too short`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Minimum username length is 4",
    });
  }

  if (password !== confirmPassword) {
    logger.warn(`[${requestId}] Password confirmation failed for ${username}`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Confirmation password not valid.",
    });
  }

  try {
    const userExists = await db.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (userExists) {
      logger.warn(
        `[${requestId}] User ${username} or email ${email} already exists`
      );
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        msg: "User sudah terdaftar",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await db.user.create({
      data: { username, password: hashedPassword, nickname, email },
    });

    logger.info(
      `[${requestId}] Successfully created new user ${username} (ID: ${newUser.id})`
    );
    res.status(StatusCodes.CREATED).json({
      success: true,
      msg: "new user registered",
      user: {
        id: newUser.id,
        username: newUser.username,
        nickname: newUser.nickname,
        email: newUser.email,
      },
    });
  } catch (error) {
    logger.error(
      `[${requestId}] Error creating user ${username}: ${
        (error as any).message
      }`,
      { error }
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const requestId = (req as any).id;
  const updateData = req.body;

  logger.info(`[${requestId}] Updating user ${id} with data:`, { updateData });

  if (!req.body || !id) {
    logger.warn(`[${requestId}] Missing ID or update data for user update`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Need id or empty changes",
    });
  }

  try {
    const user = await db.user.update({
      where: { id },
      data: req.body,
    });

    logger.info(
      `[${requestId}] Successfully updated user ${id} (${user.username})`
    );
    res.json({
      success: true,
      msg: "User updated",
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error(
      `[${requestId}] Error updating user ${id}: ${(error as any).message}`,
      {
        error,
      }
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const setProfilePhoto = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const requestId = (req as any).id;

  if (!req.file) {
    logger.warn(`[${requestId}] No image provided for user ${id}`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Image not provided",
    });
  }

  if (!id) {
    logger.warn(`[${requestId}] Missing user ID for profile photo update`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Data not provided",
    });
  }

  logger.info(`[${requestId}] Setting profile photo for user ${id}`);

  try {
    const { buffer, mimetype } = req.file;

    await db.profilePhoto.upsert({
      update: { data: buffer, mimetype },
      where: { userId: id },
      create: { data: buffer, mimetype, userId: id },
    });

    logger.info(
      `[${requestId}] Successfully updated profile photo for user ${id}`
    );
    res.json({
      success: true,
      msg: "Profile photo changed successfully",
    });
  } catch (error) {
    logger.error(
      `[${requestId}] Error setting profile photo for user ${id}: ${
        (error as any).message
      }`,
      { error }
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "Internal server error",
    });
  }
};

export const getProfilePhoto = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const requestId = (req as any).id;
  logger.info(`[${requestId}] Fetching profile photo for user ${id}`);

  if (!id) {
    logger.warn(`[${requestId}] Missing user ID for profile photo fetch`);
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Data not provided",
    });
  }

  try {
    const profilePhoto = await db.profilePhoto.findUnique({
      where: { userId: id },
    });

    if (!profilePhoto) {
      logger.warn(`[${requestId}] No profile photo found for user ${id}`);
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: "User doesnt have any profile photo.",
      });
    }

    logger.info(
      `[${requestId}] Successfully fetched profile photo for user ${id}`
    );
    res.set("Content-Type", profilePhoto.mimetype);
    res.send(profilePhoto.data);
  } catch (error) {
    logger.error(
      `[${requestId}] Error fetching profile photo for user ${id}: ${
        (error as any).message
      }`,
      { error }
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
