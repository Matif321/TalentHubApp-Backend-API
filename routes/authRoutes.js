import express from "express"
import { login, signUp, verify } from "../controllers/userController.js";




const router = express.Router();

// POST /api/auth/signup → create new user
router.post("/signUp", signUp);
router.post("/login", login)
router.post("verify", verify)

export default router;