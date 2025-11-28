import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ArticleModel } from "./article.model.js";
import { TagModel } from "./tag.model.js";

export const ArticleTagModel = sequelize.define("Article_Tag", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
});

ArticleModel.belongsToMany(TagModel, {
    through: ArticleTagModel,
    foreignKey: "article_id",
    as: "articles",
    onDelete: "CASCADE",
});

TagModel.belongsToMany(ArticleModel, {
    through: ArticleTagModel,
    foreignKey: "tag_id",
    as: "tags",
    onDelete: "CASCADE",
});

ArticleTagModel.belongsTo(ArticleModel, { foreignKey: "article_id", as: "articles" });

ArticleTagModel.belongsTo(TagModel, { foreignKey: "tag_id", as: "tags" });