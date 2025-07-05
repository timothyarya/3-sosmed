import { Router } from "express";
import { getUsers, validateUsers } from "../controllers/user.controller";

const router = Router();

router.get(["/", "/:id"], getUsers);
router.get("/validate", validateUsers);

export default router;
