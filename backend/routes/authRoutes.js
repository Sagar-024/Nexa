import express from "express";
import { googleLogin } from "../controllers/authController.js";
const router = express.Router();

router.post("/google", googleLogin);


export default router;
