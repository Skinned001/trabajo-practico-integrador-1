import { Router } from "express";
import { getAllTags, getTagById, createTag, updateTag, deleteTag } from "../controllers/tag.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.js";
import { createTagValidation, updateTagValidation, getTagIDValidation, deleteTagValidation } from "../middlewares/validations/tag.validations.js";
import { validator } from "../middlewares/validations/validator/validator.js"

export const tagRoutes = Router();

tagRoutes.get("/tags", authMiddleware, getAllTags);
tagRoutes.get("/tags/:id", getTagIDValidation, validator, authMiddleware, authAdminMiddleware, getTagById);
tagRoutes.post("/tags", createTagValidation, validator, authMiddleware, authAdminMiddleware, createTag);
tagRoutes.put("/tags/:id", updateTagValidation, validator, authMiddleware, authAdminMiddleware, updateTag);
tagRoutes.delete("/tags/:id", deleteTagValidation, validator, authMiddleware, authAdminMiddleware, deleteTag);

export default tagRoutes;