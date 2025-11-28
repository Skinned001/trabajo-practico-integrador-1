import { ArticleModel } from "../models/article.model.js";
import { matchedData } from "express-validator";
import { Op } from "sequelize";

//Busca todos los articulos
export const getAllArticles = async (req, res) => {
    const findAll = await ArticleModel.findAll();
    res.status(200).json(findAll);
};

// Encuentra articulo por ID
export const getArticleById = async (req, res) => {
    const articleID = parseInt(req.params.id);
    try {
        if (isNaN(articleID)) {
            return res.status(400).json({
                message: "Error: El ID debe ser un número",
                error: "Bad request",
                status: 400,
            });
        }

        const findID = await ArticleModel.findByPk(articleID);

        if (!findID) {
            return res.status(404).json({
                message: "Error: Ese ID no se ha encontrado",
                error: "Not found",
                status: 404,
            });
        }
        res.status(200).json(findID);
    } catch (error) {
        return res.status(500).json("Error: No se pudo encontrar el ID");
    }
};

//Crea un articulo
export const createArticle = async (req, res) => {
    const { title, content, excerpt, status } = req.body;
    if (!content) {
        return res.status(400).json({
            message: "Error: El campo content está vacío",
            error: "Bad request",
            status: 400,
        });
    }
    const contentLength = content.length;
    const excerptLength = excerpt.length;
    if (contentLength < 50) {
        return res.status(400).json({
            message: "Error: El campo content debe tener un mínimo de 50 caracteres",
            error: "Bad Request",
            status: 400,
        });
    }
    if (excerptLength > 500) {
        return res.status(400).json({
            message: "Error: El campo excerpt rebasa los 500 caracteres",
            error: "Bad Request",
            status: 400,
        });
    }
    try {
        const validatedData = matchedData(req, { locations: ["body"] });
        console.log("Los datos validados son:", validatedData);
        const createNewArticle = await ArticleModel.create(req.body);
        res.status(200).json(createNewArticle);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Actualiza un articulo
export const updateArticle = async (req, res) => {
    const articleID = parseInt(req.params.id);
    const { title, content, excerpt, status } = req.body;
    if (!content) {
        return res.status(400).json({
            message: "Error: El campo content está vacío",
            error: "Bad request",
            status: 400,
        });
    }
    if (isNaN(articleID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número",
            error: "Bad request",
            status: 400,
        });
    }
    try {
        const findID = await ArticleModel.findByPk(articleID);
        if (!findID) {
            return res.status(404).json({
                message: "Error: Ese ID no existe",
                error: "Not found",
                status: 404,
            });
        }
        const validatedData = matchedData(req, { locations: ["body"] });
        console.log("Los datos validados son:", validatedData);
        await findID.update({ title, content, excerpt, status });
        res.status(200).json("Datos actualizados");
    } catch (error) {
        return res.status(500).json({
            message: "Error: Error al actualizar artículo",
            error: "Internal server error",
            status: 500,
        });
    }
};

//Borra un articulo
export const deleteArticle = async (req, res) => {
    const articleID = parseInt(req.params.id);
    const findID = await ArticleModel.findByPk(articleID);
    if (isNaN(articleID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número",
            error: "Bad request",
            status: 400,
        });
    }
    try {
        if (!findID) {
            return res.status(404).json({
                message: "Error: Esa etiqueta no existe",
                error: "Not found",
                status: 404,
            });
        }
        const deleteArticle = await findID.destroy();
        res.status(200).json("Etiqueta eliminada.");
    } catch (error) {
        return res(500).json({
            message: "Error: Error al eliminar la etiqueta",
            error: "Internal server error",
            status: 500,
        });
    }
};