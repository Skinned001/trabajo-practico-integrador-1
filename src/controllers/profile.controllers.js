import { ProfileModel } from "../models/profile.model.js";
import { matchedData } from "express-validator";

// Trae todos los perfiles
export const getAllProfiles = async (req, res) => {
    const findAll = await ProfileModel.findAll();
    res.status(200).json(findAll);
};

// Trae un perfil por ID
export const getProfileById = async (req, res) => {
    const profileID = parseInt(req.params.id);
    try {
        if (isNaN(profileID)) {
            return res.status(400).json({
                message: "Error: El ID debe ser un número",
                error: "Bad request",
                status: 400,
            });
        }
        const findID = await ProfileModel.findByPk(profileID);
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

//Crear un perfil
export const createProfile = async (req, res) => {
    const { user_id, first_name, last_name } = req.body;
    try {
        if (!user_id || !first_name || !last_name) {
            return res.status(400).json({
                message: "Error: user_id, first_name y last_name son obligatorios.",
                error: "Bad request",
                statusCode: 400,
            });
        }
        const user = await UserModel.findByPk(user_id);
        if (!user) {
            return res.status(404).json({
                message: "Error: Usuario no encontrado.",
                error: "Not Found",
                statusCode: 404,
            });
        }
        const existingProfile = await ProfileModel.findOne({ where: { user_id } });
        if (existingProfile) {
            return res.status(400).json({
                message: "Error: Este usuario ya tiene un perfil.",
                error: "Bad request",
                statusCode: 400,
            });
        }
        const validatedData = matchedData(req, { locations: ["body"] });
        console.log("Los datos validados son:", validatedData);
        const newProfile = await ProfileModel.create({
            ...validatedData,
            user_id,
        });
        res.status(201).json({
            message: "Perfil creado correctamente.",
            profile: newProfile,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Actualizar un perfil
export const updateProfile = async (req, res) => {
    const profileID = parseInt(req.params.id);
    const { first_name, last_name, biography, avatar_url, birthday } = req.body;
    if (!first_name || !last_name) {
        return res.status(400).json({
            message: "Error: Hay campos vacíos",
            error: "Bad request",
            status: 400,
        });
    }
    if (isNaN(profileID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número",
            error: "Bad request",
            status: 400,
        });
    }
    try {
        const findID = await ProfileModel.findByPk(profileID);
        if (!findID) {
            return res.status(404).json({
                message: "Error: Ese ID no existe",
                error: "Not found",
                status: 404,
            });
        }
        const validatedData = matchedData(req, { locations: ["body"] });
        console.log("Los datos validados son:", validatedData);
        await findID.update({
            first_name,
            last_name,
            biography,
            avatar_url,
            birthday,
        });
        res.status(200).json("Datos actualizados");
    } catch (error) {
        return res.status(500).json({
            message: "Error: Error al actualizar el perfil",
            error: "Internal server error",
            status: 500,
        });
    }
};

export const deleteProfile = async (req, res) => {
    const profileID = parseInt(req.params.id);
    const findID = await ProfileModel.findByPk(profileID);
    if (isNaN(profileID)) {
        return res.status(400).json({
            message: "Error: El ID debe ser un número",
            error: "Bad request",
            status: 400,
        });
    }
    try {
        if (!findID) {
            return res.status(404).json({
                message: "Error: Ese perfil no existe",
                error: "Not found",
                status: 404,
            });
        }
        const deleteData = await findID.destroy();
        res.status(200).json("Perfil eliminado.");
    } catch (error) {
        return res(500).json({
            message: "Error: Error al eliminar el perfil",
            error: "Internal server error",
            status: 500,
        });
    }
};