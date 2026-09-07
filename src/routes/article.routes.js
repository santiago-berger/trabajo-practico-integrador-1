import { Router } from "express";
import {
    createArticle,
    getArticles,
    getMyArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
} from "../controllers/article.controller.js";
import {
    createArticleValidation,
    updateArticleValidation,
    articleIdValidation,
} from "../middlewares/validations/article.validation.js";
import { validate } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";

export const articleRouter = Router();

articleRouter.post("/articles", authMiddleware, createArticleValidation, validate, createArticle);
articleRouter.get("/articles", authMiddleware, getArticles);
articleRouter.get("/articles/user", authMiddleware, getMyArticles);
articleRouter.get("/articles/:id", authMiddleware, articleIdValidation, validate, getArticleById);
articleRouter.put("/articles/:id", authMiddleware, updateArticleValidation, validate, ownerMiddleware, updateArticle);
articleRouter.delete("/articles/:id", authMiddleware, articleIdValidation, validate, ownerMiddleware, deleteArticle);