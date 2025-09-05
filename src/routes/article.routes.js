import { Router } from "express";
import { getAllArticles, getArticleById, createArticle ,updateArticle, deleteArticle } from "../controllers/user.controllers.js";

export const articleRoutes = Router();

articleRoutes.get("/articles", getAllArticles);
articleRoutes.get("/articles/:id", getArticleById);
articleRoutes.post("/articles", createArticle);
articleRoutes.put("/articles/:id", updateUser);
articleRoutes.delete("/articles/:id",deleteUser);

export default articleRoutes;