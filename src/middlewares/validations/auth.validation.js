import { body } from "express-validator";
import { User } from "../../models/index.js";

export const registerValidation = [
  body("username")
    .notEmpty().withMessage("El username es obligatorio").bail()
    .isLength({ min: 3, max: 20 }).withMessage("El username debe tener entre 3 y 20 caracteres").bail()
    .isAlphanumeric().withMessage("El username debe ser alfanumérico").bail()
    .custom(async (username) => {
        const existe = await User.findOne({ where: { username } });
        if (existe) throw new Error("El username ya está en uso");
        return true;
    }),

  body("email")
    .notEmpty().withMessage("El email es obligatorio").bail()
    .isEmail().withMessage("El email debe tener un formato válido").bail()
    .custom(async (email) => {
        const existe = await User.findOne({ where: { email } });
        if (existe) throw new Error("El email ya está registrado");
        return true;
    }),

  body("password")
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
    .withMessage("La password debe tener 8+ caracteres, mayúscula, minúscula y número"),

  body("first_name")
    .notEmpty().withMessage("El first_name es obligatorio").bail()
    .isLength({ min: 2, max: 50 }).withMessage("El first_name debe tener entre 2 y 50 caracteres"),

  body("last_name")
    .notEmpty().withMessage("El last_name es obligatorio").bail()
    .isLength({ min: 2, max: 50 }).withMessage("El last_name debe tener entre 2 y 50 caracteres"),
];

export const loginValidation = [
    body("username").notEmpty().withMessage("El username es obligatorio"),
    body("password").notEmpty().withMessage("La password es obligatoria"),
];

export const updateProfileValidation = [
    body("first_name").optional().isLength({ min: 2, max: 50 }).withMessage("El first_name debe tener entre 2 y 50 caracteres"),
    body("last_name").optional().isLength({ min: 2, max: 50 }).withMessage("El last_name debe tener entre 2 y 50 caracteres"),
    body("biography").optional().isLength({ max: 500 }).withMessage("La biografía no puede superar los 500 caracteres"),
    body("avatar_url").optional().isURL().withMessage("El avatar_url debe ser una URL válida"),
    body("birth_date").optional().isISO8601().withMessage("El birth_date debe tener formato YYYY-MM-DD"),
];