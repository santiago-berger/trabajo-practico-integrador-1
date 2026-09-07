import { body, param } from "express-validator";
import { Tag } from "../../models/index.js";

export const tagIdValidation = [
    param("id").isInt({ gt: 0 }).withMessage("El id debe ser un entero positivo"),
];

export const createTagValidation = [
    body("name")
    .notEmpty().withMessage("El name es obligatorio").bail()
    .isLength({ min: 2, max: 30 }).withMessage("El name debe tener entre 2 y 30 caracteres").bail()
    .matches(/^\S+$/).withMessage("El name no puede contener espacios").bail()
    .custom(async (name) => {
        const existe = await Tag.findOne({ where: { name } });
        if (existe) throw new Error("Ya existe una etiqueta con ese nombre");
        return true;
    }),
];

export const updateTagValidation = [
    ...tagIdValidation,
    body("name")
        .optional()
        .isLength({ min: 2, max: 30 }).withMessage("El name debe tener entre 2 y 30 caracteres").bail()
        .matches(/^\S+$/).withMessage("El name no puede contener espacios").bail()
        .custom(async (name, { req }) => {
            const existe = await Tag.findOne({ where: { name } });
            if (existe && existe.id !== Number(req.params.id)) throw new Error("Ya existe otra etiqueta con ese nombre");
            return true;
    }),
];