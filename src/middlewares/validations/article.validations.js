import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";

export const createArticleValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title no puede estar vacío")
    .isLength({ min: 3, max: 200 })
    .withMessage("Longitud: entre 3 y 200 caracteres"),
  body("content")
    .notEmpty()
    .withMessage("Content no puede estar vacío")
    .isLength({ min: 50 })
    .withMessage("Content debe tener al menos 50 caracteres"),
  body("excerpt")
    .isLength({ max: 500 })
    .withMessage("El máximo de caracteres es 500"),
  body("status").custom(async (value) => {
    const validStatuses = ["published", "archived"];
    if (!validStatuses.includes(value)) {
      throw new Error("Status solo admite published o archived");
    }
  }),
];

export const updateArticleValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const article = await ArticleModel.findByPk(value);
      if (!article) {
        throw new Error("El article no existe");
      }
    }),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title no puede estar vacío")
    .isLength({ min: 3, max: 200 })
    .withMessage("Longitud: entre 3 y 200 caracteres"),
  body("content")
    .optional()
    .notEmpty()
    .withMessage("Content no puede estar vacío")
    .isLength({ min: 50 })
    .withMessage("Content debe tener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El máximo de caracteres es 500"),
  body("status")
    .optional()
    .custom(async (value) => {
    const validStatuses = ["published", "archived"];
    if (!validStatuses.includes(value)) {
      throw new Error("Status solo admite published o archived");
    }
  }),
];

export const getArticleIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const article = await ArticleModel.findByPk(value);
      if (!article) {
        throw new Error("El article no existe");
      }
    }),
];

export const deleteArticleValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const article = await ArticleModel.findByPk(value);
      if (!article) {
        throw new Error("El article no existe");
      }
    }),
];
