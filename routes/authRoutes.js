import express from "express"
import { signUp } from "../controllers/userController.js";


const router = express.Router();

// POST /api/auth/signup → create new user
router.post("/signUp", signUp);

export default router;