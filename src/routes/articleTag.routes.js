import { Router } from "express";
import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/articleTag.controller.js";
import {
  createArticleTagValidation,
  articleTagIdValidation,
} from "../middlewares/validations/articleTag.validation.js";
import { validate } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const articleTagRouter = Router();

articleTagRouter.post("/articles-tags", authMiddleware, createArticleTagValidation, validate, addTagToArticle);
articleTagRouter.delete("/articles-tags/:articleTagId", authMiddleware, articleTagIdValidation, validate, removeTagFromArticle);