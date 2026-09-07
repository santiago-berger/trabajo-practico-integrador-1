import { matchedData } from "express-validator";
import { Article, User, Tag } from "../models/index.js";

const authorInclude = {
    model: User,
    as: "author",
    attributes: ["id", "username", "email"],
};
const tagsInclude = {
    model: Tag,
    as: "tags",
    through: { attributes: [] },
};

// POST /api/articles
export const createArticle = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const article = await Article.create({ ...data, user_id: req.user.id });
    return res.status(201).json({ message: "Artículo creado con éxito", article });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el artículo", error: error.message });
  }
};

// GET /api/articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
        where: { status: "published" },
        include: [authorInclude, tagsInclude],
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los artículos", error: error.message });
  }
};

// GET /api/articles/user
export const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
        where: { user_id: req.user.id, status: "published" },
        include: [tagsInclude],
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener tus artículos", error: error.message });
  }
};

// GET /api/articles/:id
export const getArticleById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const article = await Article.findByPk(id, {
        include: [authorInclude, tagsInclude],
    });
    if (!article) return res.status(404).json({ message: "Artículo no encontrado" });
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el artículo", error: error.message });
  }
};

// PUT /api/articles/:id
export const updateArticle = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    await req.article.update(data);
    return res.status(200).json({ message: "Artículo actualizado con éxito", article: req.article });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el artículo", error: error.message });
  }
};

// DELETE /api/articles/:id
export const deleteArticle = async (req, res) => {
  try {
    await req.article.destroy();
    return res.status(200).json({ message: "Artículo eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el artículo", error: error.message });
  }
};