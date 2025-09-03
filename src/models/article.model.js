// src/models/post.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./User.model.js";

export const PostModel = sequelize.define("Post", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            len: {
                args: [3, 200],
                msg: "El título debe tener entre 3 y 200 caracteres.",
            },
        },
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: {
                args: [50],
                msg: "El contenido debe tener al menos 50 caracteres.",
            },
        },
    },
    excerpt: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("published", "archived"),
        defaultValue: "published",
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserModel,
            key: "id",
        },
    },
},
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    });



