import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMe, updateMe } from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);

export default router;
