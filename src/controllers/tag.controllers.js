import { TagModel } from "../models/tag.model.js";
import { matchedData } from "express-validator";
import { Op } from "sequelize";

// Conseguir todas las tags
export const getAllTags = async (req, res) => {
  const findAll = await TagModel.findAll();
  res.status(200).json(findAll);
};

// Conseguir una tag por id
export const getTagById = async (req, res) => {
  const tagID = parseInt(req.params.id);
  try {
    if (isNaN(tagID)) {
      return res.status(400).json({
        message: "Error: El ID debe ser un número",
        error: "Bad request",
        status: 400,
      });
    }

    const findID = await TagModel.findByPk(tagID);

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

// Crear una tag
export const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const tagExists = await TagModel.findOne({ where: { name: name } });
    if (tagExists) {
      return res.status(400).json({
        message: "Error: Esa etiqueta ya existe",
        error: "Bad request",
        statusCode: 400,
      });
    }
    if (!name) {
      return res.status(400).json({
        message: "Error: El campo name está vacío",
        error: "Bad request",
        status: 400,
      });
    }
    const validatedData = matchedData(req, { locations: ["body"] });
    console.log("Los datos validados son:", validatedData);
    const createNewTag = await TagModel.create(req.body);
    res.status(200).json(createNewTag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Actualizar una tag
export const updateTag = async (req, res) => {
  const tagID = parseInt(req.params.id);
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "Error: El campo name está vacío",
      error: "Bad request",
      status: 400,
    });
  }
  if (isNaN(tagID)) {
    return res.status(400).json({
      message: "Error: El ID debe ser un número",
      error: "Bad request",
      status: 400,
    });
  }
  try {
    const findID = await TagModel.findByPk(tagID);
    if (!findID) {
      return res.status(404).json({
        message: "Error: Ese ID no existe",
        error: "Not found",
        status: 404,
      });
    }
    const checkIfTagExists = await TagModel.findOne({
      where: { name: name, id: { [Op.ne]: id } },
    });
    if (checkIfTagExists) {
      return res.status(400).json({
        message: "Error: Esa etiqueta ya existe",
        error: "Bad request",
        status: 400,
      });
    }
    const validatedData = matchedData(req, { locations: ["body"] });
    console.log("Los datos validados son:", validatedData);
    await findID.update({ name });
    res.status(200).json("Datos actualizados");
  } catch (error) {
    return res.status(500).json({
      message: "Error: Error al actualizar etiqueta",
      error: "Internal server error",
      status: 500,
    });
  }
};

// Borrar un tag
export const deleteTag = async (req, res) => {
  const tagID = parseInt(req.params.id);
  const findID = await TagModel.findByPk(tagID);
  if (isNaN(tagID)) {
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
    const deleteData = await findID.destroy();
    res.status(200).json("Etiqueta eliminada.");
  } catch (error) {
    return res(500).json({
      message: "Error: Error al eliminar la etiqueta",
      error: "Internal server error",
      status: 500,
    });
  }
};