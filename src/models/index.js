import { sequelize } from "../config/database.js";
import { User } from "./user.model.js";
import { Profile } from "./profile.model.js";
import { Article } from "./article.model.js";
import { Tag } from "./tag.model.js";
import { ArticleTag } from "./article_tag.model.js";

// relacion 1:1 entre y Profile
User.hasOne(Profile, {
    foreignKey: "user_id",
    as: "profile",
    onDelete: "CASCADE", // borrar el user borra su profile
});
Profile.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

// relacion 1:N entre User y Article
User.hasMany(Article, {
    foreignKey: "user_id",
    as: "articles",
});
Article.belongsTo(User, {
    foreignKey: "user_id",
    as: "author",
});

// relacion N:M entre Article y Tag a traves de ArticleTag
Article.belongsToMany(Tag, {
    through: ArticleTag,
    foreignKey: "article_id",
    otherKey: "tag_id",
    as: "tags",
    onDelete: "CASCADE", // borrar el article borra sus filas en article_tags
});
Tag.belongsToMany(Article, {
    through: ArticleTag,
    foreignKey: "tag_id",
    otherKey: "article_id",
    as: "articles",
});

Article.addHook("beforeDestroy", async (article) => {
    await ArticleTag.destroy({ where: { article_id: article.id } });
});

export { sequelize, User, Profile, Article, Tag, ArticleTag };