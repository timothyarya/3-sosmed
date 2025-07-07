import { Router } from "express";
import {
  getUserByID, // Get user by ID
  getUsersByQuery, // Get users by query
  validateUsers, // Validate user credentials
  createUser, // Create new user
  updateUser, // Update existing user
} from "../controllers/user.controller";

const router = Router();

router.get("/:id", getUserByID); // Get user by ID
router.get("/validate", validateUsers); // Validate user credentials
router.post("/", createUser); // Create new user
router.patch("/:id", updateUser); // Update existing user

export default router;
