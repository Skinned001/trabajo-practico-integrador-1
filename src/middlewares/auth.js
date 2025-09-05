import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }
    const decoded = verifyToken(token);
    req.userLogged = decoded;
    console.log(decoded)
    next();
  } catch (error) {
    res.status(500).json({ message: "Error interno en el servidor" });
  }
};