import { body, param } from "express-validator";
import { Article, Tag, ArticleTag } from "../../models/index.js";

export const createArticleTagValidation = [
    body("article_id")
        .notEmpty().withMessage("El article_id es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El article_id debe ser un entero positivo").bail()
        .custom(async (article_id) => {
            const article = await Article.findByPk(article_id);
            if (!article) throw new Error("El artículo indicado no existe");
            return true;
    }),
    body("tag_id")
        .notEmpty().withMessage("El tag_id es obligatorio").bail()
        .isInt({ gt: 0 }).withMessage("El tag_id debe ser un entero positivo").bail()
        .custom(async (tag_id) => {
            const tag = await Tag.findByPk(tag_id);
        if (!tag) throw new Error("La etiqueta indicada no existe");
        return true;
    }),
    // evita duplicar la misma asociacion
    body("tag_id").custom(async (tag_id, { req }) => {
        const existe = await ArticleTag.findOne({
            where: { article_id: req.body.article_id, tag_id },
    });
    if (existe) throw new Error("El artículo ya tiene esa etiqueta");
    return true;
  }),
];

export const articleTagIdValidation = [
    param("articleTagId").isInt({ gt: 0 }).withMessage("El articleTagId debe ser un entero positivo"),
];