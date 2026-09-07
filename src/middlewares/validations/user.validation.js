import { body, param } from "express-validator";
import { User } from "../../models/index.js";
import { registerValidation } from "./auth.validation.js";

export const userIdValidation = [
  param("id").isInt({ gt: 0 }).withMessage("El id debe ser un entero positivo"),
];

// reutiliza las reglas de register y suma el role, que solo el admin puede elegir
export const createUserValidation = [
  ...registerValidation,
  body("role").optional().isIn(["user", "admin"]).withMessage("El role solo puede ser 'user' o 'admin'"),
];

export const updateUserValidation = [
  ...userIdValidation,
  body("username")
    .optional()
    .isLength({ min: 3, max: 20 }).withMessage("El username debe tener entre 3 y 20 caracteres").bail()
    .isAlphanumeric().withMessage("El username debe ser alfanumérico").bail()
    .custom(async (username, { req }) => {
      const existe = await User.findOne({ where: { username } });
      if (existe && existe.id !== Number(req.params.id)) throw new Error("El username ya está en uso");
      return true;
    }),
  body("email")
    .optional()
    .isEmail().withMessage("El email debe tener un formato válido").bail()
    .custom(async (email, { req }) => {
      const existe = await User.findOne({ where: { email } });
      if (existe && existe.id !== Number(req.params.id)) throw new Error("El email ya está registrado por otro usuario");
      return true;
    }),
  body("role").optional().isIn(["user", "admin"]).withMessage("El role solo puede ser 'user' o 'admin'"),
];