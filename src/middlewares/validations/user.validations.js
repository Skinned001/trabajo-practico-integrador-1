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

];

export const deleteUserValidation = [

];
