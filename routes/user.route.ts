import { Router } from "express";
import {
  getUserByID,
  getUsersByQuery,
  validateUsers,
  createUser,
  updateUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/:id", getUserByID);
router.get("/validate", validateUsers);
router.post("/", createUser);
router.patch("/:id", updateUser);

export default router;
