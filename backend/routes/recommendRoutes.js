import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getRecommendations } from "../controllers/recommendController.js";
const router = express.Router();

router.post("/", protect, getRecommendations);

export default router;
