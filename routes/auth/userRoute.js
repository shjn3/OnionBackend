import express from "express";
import {
  loginUser,
  registerUser,
  getAccessToken,
  logOutUser,
} from "../../controllers/auth/userController.js";
import { isAuth } from "../../token/utils.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/token", getAccessToken);
router.get("/logout", isAuth, logOutUser);
export default router;
