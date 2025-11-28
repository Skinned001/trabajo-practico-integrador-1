import { ProfileModel } from "../../models/profile.model.js";
import { body, param } from "express-validator";

export const createProfileValidation = [
  body("first_name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("first_name debe tener entre 2 y 50 caracteres")
    .isAlpha()
    .withMessage("El first_name solo admite letras"),
  body("last_name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("last_name debe tener entre 2 y 50 caracteres")
    .isAlpha()
    .withMessage("El last_name solo admite letras"),
  body("biography")
    .isLength({ max: 500 })
    .withMessage("Biography no admite más de 500 caracteres"),
];

export const getProfileById = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const profile = await ProfileModel.findByPk(value);
      if (!profile) {
        throw new Error("El perfil no existe");
      }
    }),
];

export const updateProfileValidation = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const profile = await ProfileModel.findByPk(value);
      if (!profile) {
        throw new Error("El usuario no existe");
      }
    }),
  body("first_name")
    .trim()
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("first_name debe tener entre 2 y 50 caracteres")
    .isAlpha()
    .withMessage("El first_name solo admite letras"),
  body("last_name")
    .trim()
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("last_name debe tener entre 2 y 50 caracteres")
    .isAlpha()
    .withMessage("El last_name solo admite letras"),
  body("biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Biography no admite más de 500 caracteres"),
];

export const deleteProfile = [
  param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El campo ID debe ser un numero")
    .custom(async (value) => {
      const profile = await ProfileModel.findByPk(value);
      if (!profile) {
        throw new Error("El perfil no existe");
      }
    }),
];
