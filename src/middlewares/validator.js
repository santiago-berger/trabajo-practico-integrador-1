import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formateados = errors.formatWith((err) => `${err.path}: ${err.msg}`);
    return res.status(400).json({
      message: "Errores de validación",
      errors: formateados.array(),
    });
  }

  next();
};