import { body, param } from "express-validator";

export const articleIdValidation = [
    param("id").isInt({ gt: 0 }).withMessage("El id debe ser un entero positivo"),
];

export const createArticleValidation = [
    body("title")
        .notEmpty().withMessage("El title es obligatorio").bail()
        .isLength({ min: 3, max: 200 }).withMessage("El title debe tener entre 3 y 200 caracteres"),
    body("content")
        .notEmpty().withMessage("El content es obligatorio").bail()
        .isLength({ min: 50 }).withMessage("El content debe tener al menos 50 caracteres"),
    body("excerpt")
        .optional()
        .isLength({ max: 500 }).withMessage("El excerpt no puede superar los 500 caracteres"),
    body("status")
        .optional()
        .isIn(["published", "archived"]).withMessage("El status solo puede ser 'published' o 'archived'"),
];

export const updateArticleValidation = [
    ...articleIdValidation,
    body("title").optional().isLength({ min: 3, max: 200 }).withMessage("El title debe tener entre 3 y 200 caracteres"),
    body("content").optional().isLength({ min: 50 }).withMessage("El content debe tener al menos 50 caracteres"),
    body("excerpt").optional().isLength({ max: 500 }).withMessage("El excerpt no puede superar los 500 caracteres"),
    body("status").optional().isIn(["published", "archived"]).withMessage("El status solo puede ser 'published' o 'archived'"),
];