import { UserModel } from "../models/user.model.js";
import { validationResult, matchedData } from "express-validator";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  const findAll = await UserModel.findAll();
  res.status(200).json(findAll);
};

// Obtener usuario por ID
export const getUserByID = async (req, res) => {
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
