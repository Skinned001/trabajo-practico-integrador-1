import { Router } from "express";
import { getAllProfiles, getProfileById, createProfile, updateProfile, deleteProfile } from "../controllers/profile.controllers.js";

export const profileRoutes = Router();

profileRoutes.get("/profiles", getAllProfiles);
profileRoutes.get("/profiles/:id", getProfileById);
profileRoutes.post("/profiles", createProfile);
profileRoutes.put("/profiles/:id", updateProfile);
profileRoutes.delete("/profiles/:id",deleteProfile);

export default profileRoutes; 