import { TagModel } from "../../models/tag.model.js";
import { body, param } from "express-validator";
import { Op } from "sequelize";

export const createTagValidation = [
  body("name")
    .custom(async (value) => {
      const tagExists = await TagModel.findOne({
        where: { name: value },
      });
      if (tagExists) {
        throw new Error("Ese tag ya existe");
      }
      return true;
    })
    .trim()
    .notEmpty()
    .withMessage("El campo name es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("La longitud debe ser entre 2 y 30 caracteres"),
];

export const updateTagValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const tag = await TagModel.findByPk(value);
      if (!tag) {
        throw new Error("El usuario no existe");
      }
    }),
  body("name")
    .custom(async (value) => {
      const tagExists = await TagModel.findOne({
        where: { name: value, id: { [Op.ne]: req.params.id } },
      });
      if (tagExists) {
        throw new Error("Ese tag ya existe");
      }
      return true;
    })
    .trim()
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage("La longitud debe ser entre 2 y 30 caracteres"),
];

export const getTagIDValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const tag = await TagModel.findByPk(value);
      if (!tag) {
        throw new Error("El tag no existe");
      }
    }),
];

export const deleteTagValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const tag = await TagModel.findByPk(value);
      if (!tag) {
        throw new Error("El tag no existe");
      }
    }),
];
