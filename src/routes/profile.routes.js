import { Router } from "express";
import { getAllProfiles, getProfileById, updateProfile, deleteProfile } from "../controllers/profile.controllers.js";

export const profileRoutes = Router();

profileRoutes.get("/profiles", getAllProfiles);
profileRoutes.get("/profiles/:id", getProfileById);
profileRoutes.put("/profiles/:id", updateProfile);
profileRoutes.delete("/profiles/:id",deleteProfile);

export default profileRoutes;