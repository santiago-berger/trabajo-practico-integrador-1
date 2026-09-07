import { Article } from "../models/index.js";

// verifica que el usuario sea el autor del artículo
export const ownerMiddleware = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    const esAutor = article.user_id === req.user.id;
    const esAdmin = req.user.role === "admin";

    if (!esAutor && !esAdmin) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: no sos el autor del artículo" });
    }

    req.article = article;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};