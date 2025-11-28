import { Router } from "express";
import {login,logout,register,profile,updateProfile} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { createUserValidation } from "../middlewares/validations/user.validations.js";
import { validator } from "../middlewares/validations/validator/validator.js";
import {createProfileValidation,updateProfileValidation} from "../middlewares/validations/profile.validations.js";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  createUserValidation,
  createProfileValidation,
  validator,
  register
);
authRoutes.post("/login", login);
authRoutes.post("/logout", authMiddleware, logout);

authRoutes.get("/profile", authMiddleware, profile);
authRoutes.put(
  "/profile",
  authMiddleware,
  updateProfileValidation,
  validator,
  updateProfile
);

export default authRoutes;
