import { Router } from "express";
import { getAllArticles, getArticleById, createArticle ,updateArticle, deleteArticle } from "../controllers/article.controllers.js";

export const articleRoutes = Router();

articleRoutes.get("/articles", getAllArticles);
articleRoutes.get("/articles/:id", getArticleById);
articleRoutes.post("/articles", createArticle);
articleRoutes.put("/articles/:id", updateArticle);
articleRoutes.delete("/articles/:id",deleteArticle);

export default articleRoutes;