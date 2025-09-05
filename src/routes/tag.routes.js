import { Router } from "express";
import { getAllTags, getTagById, createTag, updateTag, deleteTag } from "../controllers/tag.controllers.js";

export const userRoutes = Router();

tagRoutes.get("/tags", getAllTags);
tagRoutes.get("/tags/:id", getTagById);
tagRoutes.post("/tags/:", createTag);
tagRoutes.put("/tags/:id", updateTag);
tagRoutes.delete("/tags/:id",deleteTag);

export default tagRoutes;