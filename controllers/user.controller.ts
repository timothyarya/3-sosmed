import type { Request, Response } from "express";
import db from "../prisma/db";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

/**
 * Validates a user's credentials.
 *
 * @param req - The Express request object, expected to contain `username` and `password` in the body.
 * @param res - The Express response object used to send back the appropriate HTTP response.
 * @returns A JSON response indicating the validation result:
 *          - If `username` or `password` is not provided, returns a 400 status with "Data not provided" error.
 *          - If the user is not found, returns a 404 status with "User tidak terdaftar" error.
 *          - If the password does not match, returns a 401 status with "Password salah!" error.
 *          - If the credentials are valid, returns a 200 status with the user data.
 */

export const validateUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  // Extract the username and password from the request body
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password)
    return res.json({ success: false, msg: "Data not provided" });

  try {
    // Find the user by the provided username
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user)
      // If the user is not found, return a 404 status with an error message
      return res.json({ success: false, msg: "User tidak terdaftar" });

    // Compare the provided password with the password stored in the database
    if (!(await bcrypt.compare(password, user.password)))
      // If the password does not match, return a 401 status with an error message
      return res.json({ success: false, msg: "Password salah!" });

    // If the credentials are valid, return a 200 status with the user data
    res.json({ success: true, msg: "User found", user });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description - Get user by ID
 * @param req - The Express request object used to get the user ID from the route parameters.
 * @param res - The Express response object used to send back the appropriate HTTP response.
 * @returns A JSON response indicating the validation result:
 *          - If the user is not found, returns a 404 status with "User tidak terdaftar" error.
 *          - If the user is found, returns a 200 status with the user data.
 */
export const getUserByID = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    // Find the user by the provided ID
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      // If the user is not found, return a 404 status with an error message
      return res.json({ success: false, msg: "User tidak terdaftar" });
    }

    // If the user is found, return a 200 status with the user data
    return res.json({ success: true, msg: "User found", user });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description - Get users by query
 * @param req - The Express request object used to get the query from the query parameters.
 * @param res - The Express response object used to send back the appropriate HTTP response.
 * @returns A JSON response indicating the validation result:
 *          - If the query is not provided, returns a 200 status with all users' data.
 *          - If the query is provided, returns a 200 status with the users that match the query.
 */
export const getUsersByQuery = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { query } = req.query;

  try {
    if (!query) {
      // If the query is not provided, return all users
      const users = await db.user.findMany();
      return res.json({ success: true, msg: "All users", users });
    }

    // Search for users that match the query in the username, email, and nickname fields
    const users = await db.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query as string,
            },
          },
          {
            email: {
              contains: query as string,
            },
          },
          {
            nickname: {
              contains: query as string,
            },
          },
        ],
      },
    });

    res.json({ success: true, msg: `Users with query ${query}`, users });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Creates a new user.
 *
 * @param req - The Express request object containing the user information in the body.
 * @param res - The Express response object used to send back the appropriate HTTP response.
 * @returns A JSON response indicating the creation result:
 *          - A 400 status with "Bad data provided." error if any of the required fields are not provided.
 *          - A 400 status with "Minimum username length is 4" error if the username is too short.
 *          - A 400 status with "Confirmation password not valid." error if the password confirmation does not match.
 *          - A 401 status with "User sudah terdaftar" error if the user already exists.
 *          - A 201 status with "new user registered" message on success, along with the newly created user object.
 */
export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { username, nickname, password, confirmPassword, email } = req.body;

  // Validate request body
  if (!username || !nickname || !password || !confirmPassword || !email)
    return res.json({ success: false, msg: "Bad data provided." });

  if (username.length < 4)
    return res.json({ success: false, msg: "Minimum username length is 4" });

  if (password !== confirmPassword)
    return res.json({
      success: false,
      msg: "Confirmation password not valid.",
    });

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
      return res.json({ success: false, msg: "User sudah terdaftar" });

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await db.user.create({
      data: {
        username,
        password: hashedPassword,
        nickname,
        email,
      },
    });

    res.json({ success: true, msg: "new user registered", user: newUser });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Updates an existing user.
 *
 * @param req - The Express request object, expected to contain the user ID in the route parameters.
 * @param res - The Express response object used to send back the appropriate HTTP response.
 * @returns A JSON response indicating the update result:
 *          - A 400 status with "Need id or empty changes" error if either the user ID or the request body is empty.
 *          - A 200 status with the updated user data on success.
 */
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  // Need id and request body to update user.
  if (!req.body || !id)
    return res.json({ success: false, msg: "Need id or empty changes" });

  try {
    const user = await db.user.update({
      where: {
        id,
      },
      // Update user with new data.
      data: req.body,
    });
    res.json({ success: true, msg: "User updated", user });
  } catch (error) {
    console.log(error);
  }
};

export const setProfilePhoto = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  if (!req.file) return res.json({ success: false, msg: "Image not provided" });

  if (!id) return res.json({ success: false, msg: "Data not provided" });

  try {
    const { buffer, mimetype } = req.file;

    await db.profilePhoto.upsert({
      update: {
        data: buffer,
        mimetype,
      },
      where: {
        userId: id,
      },
      create: {
        data: buffer,
        mimetype,
        userId: id,
      },
    });

    res.json({ success: true, msg: "Profile photo changed successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getProfilePhoto = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  if (!id) return res.json({ success: false, msg: "Data not provided" });

  try {
    const profilePhoto = await db.profilePhoto.findUnique({
      where: {
        userId: id,
      },
    });

    if (!profilePhoto)
      return res.json({
        success: false,
        msg: "User doesnt have any profile photo.",
      });
  } catch (error) {
    console.log(error);
  }
};
