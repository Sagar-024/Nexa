import express from "express";
import getRecommendations from "../controllers/getRecommendations.js";

const router = express.Router();

// POST /api/v1/recommendations
router.post("/", getRecommendations);

export default router;
