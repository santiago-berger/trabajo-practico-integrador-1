import { matchedData } from "express-validator";
import { Article, ArticleTag } from "../models/index.js";

// POST /api/articles-tags
export const addTagToArticle = async (req, res) => {
    try {
        const { article_id, tag_id } = matchedData(req, { locations: ["body"] });

        // verificar que el usuario logueado sea el autor del articulo
        const article = await Article.findByPk(article_id);
        const esAutor = article.user_id === req.user.id;
        const esAdmin = req.user.role === "admin";
        if (!esAutor && !esAdmin) {
            return res.status(403).json({ message: "Solo el autor puede etiquetar el artículo" });
        }

        const articleTag = await ArticleTag.create({ article_id, tag_id });
        return res.status(201).json({ message: "Etiqueta agregada al artículo", articleTag });
    } catch (error) {
        return res.status(500).json({ message: "Error al agregar la etiqueta", error: error.message });
    }
};

// DELETE /api/articles-tags/:articleTagId
export const removeTagFromArticle = async (req, res) => {
    try {
        const { articleTagId } = matchedData(req, { locations: ["params"] });

        const articleTag = await ArticleTag.findByPk(articleTagId);
        if (!articleTag) return res.status(404).json({ message: "Asociación no encontrada" });

        const article = await Article.findByPk(articleTag.article_id);
        const esAutor = article.user_id === req.user.id;
        const esAdmin = req.user.role === "admin";
        if (!esAutor && !esAdmin) {
            return res.status(403).json({ message: "Solo el autor puede quitar la etiqueta" });
        }

        await articleTag.destroy();
        return res.status(200).json({ message: "Etiqueta removida del artículo" });
    } catch (error) {
        return res.status(500).json({ message: "Error al remover la etiqueta", error: error.message });
    }
};