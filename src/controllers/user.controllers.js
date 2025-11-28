import { UserModel } from "../models/user.model.js";
import { validationResult, matchedData } from "express-validator";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    const findAll = await UserModel.findAll();
    res.status(200).json(findAll);
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = matchedData(req); // limpio

    try {
        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "Error: Ese ID no se ha encontrado",
                error: "Not found",
                status: 404,
            });
        }
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json("Error: No se pudo encontrar el ID");
    }
};

// Creo un usuario
export const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Error: username, email y password son obligatorios",
                error: "Bad request",
                status: 400
            });
        }
        if (username.length < 3 || username.length > 20) {
            return res.status(400).json({
                message: "Error: username debe tener entre 3 y 20 caracteres",
                error: "Bad request",
                status: 400
            });
        }
        if (email.length > 100 || password.length > 255) {
            return res.status(400).json({
                message: "Error: email o password superan la longitud máxima",
                error: "Bad request",
                status: 400
            });
        }
        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: "Error: Ese email ya está registrado",
                error: "Bad request",
                status: 400
            });
        }
        const existingUsername = await UserModel.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({
                message: "Error: Ese username ya está registrado",
                error: "Bad request",
                status: 400
            });
        }
        if (role && !["user", "admin"].includes(role)) {
            return res.status(400).json({
                message: "Error: role inválido (solo 'user' o 'admin')",
                error: "Bad request",
                status: 400
            });
        }
        const newUser = await UserModel.create({ username, email, password, role });
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({
            message: "Error: No se pudo crear el usuario",
            error: error.message,
            status: 500
        });
    }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id, name, email, password } = matchedData(req); // limpio

    try {
        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "Error: Ese ID no existe",
                error: "Not found",
                status: 404,
            });
        }

        const checkIfEmailExists = await UserModel.findOne({ where: { email } });
        if (checkIfEmailExists && checkIfEmailExists.id !== id) {
            return res.status(400).json({
                message: "Error: Ese email ya está en uso",
                error: "Bad request",
                status: 400,
            });
        }

        await user.update({ name, email, password });
        res.status(200).json("Datos actualizados");
    } catch (error) {
        return res.status(500).json({
            message: "Error: Error al actualizar usuario",
            error: "Internal server error",
            status: 500,
        });
    }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = matchedData(req);

    try {
        const user = await UserModel.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: "Error: Ese usuario no existe",
                error: "Not found",
                status: 404,
            });
        }

        await user.destroy();
        res.status(200).json("Usuario eliminado.");
    } catch (error) {
        return res.status(500).json({
            message: "Error: Error al eliminar el usuario",
            error: "Internal server error",
            status: 500,
        });
    }
};
