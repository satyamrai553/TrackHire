import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  changeCurrentPassword,
} from "../controllers/user.controller.js";

const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

// Protected routes
router.post("/logout", verifyJWT, logoutUser);
router.get("/me", verifyJWT, getCurrentUser);
router.patch("/update", verifyJWT, updateAccountDetails);
router.patch("/update-avatar", verifyJWT, upload.single("avatar"), updateUserAvatar);
router.post("/change-password", verifyJWT, changeCurrentPassword);

export default router;
