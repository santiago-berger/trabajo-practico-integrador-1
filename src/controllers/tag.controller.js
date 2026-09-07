import { matchedData } from "express-validator";
import { Tag, Article } from "../models/index.js";

// POST /api/tags
export const createTag = async (req, res) => {
  try {
    const { name } = matchedData(req);
    const tag = await Tag.create({ name });
    return res.status(201).json({ message: "Etiqueta creada con éxito", tag });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la etiqueta", error: error.message });
  }
};

// GET /api/tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las etiquetas", error: error.message });
  }
};

// GET /api/tags/:id
export const getTagById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const tag = await Tag.findByPk(id, {
      include: [
        {
            model: Article,
            as: "articles",
            through: { attributes: [] },
        },
      ],
    });
    if (!tag) return res.status(404).json({ message: "Etiqueta no encontrada" });
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la etiqueta", error: error.message });
  }
};

// PUT /api/tags/:id
export const updateTag = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const data = matchedData(req, { locations: ["body"] });
    const tag = await Tag.findByPk(id);
    if (!tag) return res.status(404).json({ message: "Etiqueta no encontrada" });
    await tag.update(data);
    return res.status(200).json({ message: "Etiqueta actualizada con éxito", tag });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar la etiqueta", error: error.message });
  }
};

// DELETE /api/tags/:id  (admin)
export const deleteTag = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const tag = await Tag.findByPk(id);
    if (!tag) return res.status(404).json({ message: "Etiqueta no encontrada" });
    await tag.destroy();
    return res.status(200).json({ message: "Etiqueta eliminada con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar la etiqueta", error: error.message });
  }
};