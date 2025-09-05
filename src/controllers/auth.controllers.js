import jwt from "jsonwebtoken";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";

export const register = async (req, res) => {
  const { name, lastname, username, email, password } = req.body;
  try {
    const person = await PersonModel.create({
      name: name,
      lastname: lastname,
    });

    const hashedPassword = await hashPassword(password);

    await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      person_id: person.id,
    });

    res.status(201).json({
      msg: "usuario creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};