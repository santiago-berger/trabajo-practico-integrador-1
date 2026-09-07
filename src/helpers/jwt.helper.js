import jwt from "jsonwebtoken";

// genera un token firmado con los datos del usuario
export const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES || "1h",
    });
  } catch (error) {
    throw new Error("Error generando el token: " + error.message);
  }
};

// verifica la firma del token y devuelve el payload decodificado
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Error verificando el token: " + error.message);
  }
};