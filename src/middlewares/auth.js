
import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      // 1. Token Faltante (No autenticado)
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const decoded = verifyToken(token); // Si falla, lanza un error
    req.userLogged = decoded;
    console.log(decoded);
    next();
  } catch (error) {

    console.error("Error al verificar el token:", error.message);
    return res.status(403).json({
      message: "Acceso denegado: Token inválido o expirado.",
    });
  }
};
