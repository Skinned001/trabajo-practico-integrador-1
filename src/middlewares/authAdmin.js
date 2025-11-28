// src/middlewares/authAdmin.js (CÓDIGO CORREGIDO)
// No es necesario importar verifyToken aquí si authMiddleware ya lo ejecutó

export const authAdminMiddleware = (req, res, next) => {
  // 1. Verificar si authMiddleware adjuntó los datos del usuario logueado.
  //    El usuario autenticado debe estar en req.userLogged (establecido por authMiddleware)
  const userLogged = req.userLogged; // Si por alguna razón authMiddleware no adjuntó el usuario, o si no se ejecutó,

  // ERROR CORREGIDO: Eliminamos la verificación de token y la decodificación
  // que ya hizo el middleware anterior.

  // se detiene la ejecución aquí (aunque authMiddleware debería haberlo hecho).
  if (!userLogged) {
    // Esto debería ser capturado por authMiddleware, pero es una capa de seguridad
    return res
      .status(401)
      .json({ message: "No autenticado o datos de usuario faltantes." });
  } // 2. Verificar el rol.

  if (userLogged.role !== "admin") {
    // TERMINAR la solicitud si el rol no es 'admin'
    return res.status(403).json({
      // Usar 403 Forbidden para permisos
      msg: "Permiso denegado. Se requiere rol de administrador.",
    });
  } // 3. Continuar solo si es admin.

  next();
};
