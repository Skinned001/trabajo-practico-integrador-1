import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ArticleModel = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        len: [3, 200],
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [50],
    },
    excerpt: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("published", "archived"),
        defaultValue: "published",
    },
},
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    });

UserModel.hasMany(ArticleModel, { foreignKey: "user_id", as: "user" });

ArticleModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });

