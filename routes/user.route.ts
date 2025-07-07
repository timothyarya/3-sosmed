import { Router } from "express";
import {
  getUserByID, // Get user by ID
  getUsersByQuery, // Get users by query
  validateUsers, // Validate user credentials
  createUser, // Create new user
  updateUser, // Update existing user
  getProfilePhoto,
  setProfilePhoto,
  getUsers,
} from "../controllers/user.controller";
import upload from "../utils/upload";
import logger from "../utils/logger";

const router = Router();

router.get("/validate", validateUsers); // Validate user credentials
router.get("/all", getUsers);
router.get("/id/:id", getUserByID); // Get user by ID
router.get("/photo/:id", getProfilePhoto);
router.post("/photo/:id", upload.single("file"), setProfilePhoto);
router.post("/", createUser); // Create new user
router.patch("/:id", updateUser); // Update existing user

export default router;
