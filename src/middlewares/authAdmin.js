import { verifyToken } from "../helpers/jwt.helper.js";

export const authAdminMiddleware = (req, res, next) => {
  const userLogged = req.user;
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }
  const decoded = verifyToken(token);
  req.userLogged = decoded;
  if (decoded.role !== "admin") {
    return res.status(401).json({
      msg: "Permiso denegado",
    });
  }
  next();
};