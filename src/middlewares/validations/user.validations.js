import { body, param } from "express-validator";
import { UserModel } from "../../models/User.model";
import { Op } from "sequelize";


export const createUserValidation = [
    body("username")
        .notEmpty()
        .withMessage("El campo Username es obligatorio")
        .isLength({ min: 3, max: 20 })
        .custom(async (value) => {
            const userExists = await UserModel.findOne({ where: { user: value } });
            if (userExists) {
                throw new Error("Ese nombre de usuario ya esta tomado.");
            }
        }),
    body("password")
        .notEmpty()
        .withMessage("El campo contraseña es obligatorio"),
    body("email")
        .notEmpty()
        .withMessage("El campo email es obligatorio")
        .isEmail()
        .custom(async (value) => {
            const emailExists = await UserModel.findOne({ where: { email: value } });
            if (emailExists) {
                throw new Error("Ese email ya se ha registrado.");
            }
        }),
    body("role")
        .optional()
        .custom(async (value) => {
            const admittedRoles = ["user", "admin"];
            if (!admittedRoles.includes(value)) {
                throw new Error("Solo admitidos user o admin en role");
            }
        }),
];

export const updateUserValidation = [
    param("id")
        .isInt()
        .withMessage("El id debe ser un entero")
        .custom(async (value) => {
            const user = await UserModel.findByPk(value);

            if (!person) {
                throw new Error("La persona no existe");
            }
        }),
    body("username")
        .trim()
        .optional()
        .isAlphanumeric()
        .withMessage("El campo username debe ser alfanumérico")
        .isLength({ min: 3, max: 20 })
        .withMessage("El first_name debe ser entre 3 y 15 caracteres"),
    body("password")
        .optional()
        .notEmpty()
        .withMessage("El campo lastname debe ser obligatorio"),
    body("email")
        .optional()
        .isEmail()
        .custom(async (value) => {
            const emailExists = await UserModel.findOne({
                where: { email: value, id: { [Op.ne]: req.params.id } },
            });
            if (emailExists) {
                throw new Error("Ese email ya esta en uso.");
            }
        }),
    body("role")
        .optional()
        .custom(async (value) => {
            const admittedRoles = ["user", "admin"];
            if (!admittedRoles.includes(value)) {
                throw new Error("El campo role solo admite user o admin");
            }
        }),
];

export const getUserIdValidation = [
    param("id")
        .exists()
        .isInt({ min: 1 })
        .withMessage("")
        .custom(async (value) => {
            const user = await UserModel.findByPk(value);
            if (!user) {
                throw new Error("El usuario no existe");
            }
        }),
];

export const deleteUserValidation = [
    param("id")
        .exists()
        .isInt({ min: 1 })
        .withMessage("El campo ID debe ser un numero")
        .custom(async (value) => {
            const user = await UserModel.findByPk(value);
            if (!user) {
                throw new Error("El usuario no existe");
            }
        }),
];