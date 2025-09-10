import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {

    const hashedPassword = await hashPassword(password);

    await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
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