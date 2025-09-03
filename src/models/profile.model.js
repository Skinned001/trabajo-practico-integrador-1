// src/models/profile.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./User.model.js";

export const ProfileModel = sequelize.define("Profile", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: UserModel,
            key: "id",
        },
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    biography: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    avatar_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isUrl: {
                msg: "El avatar debe ser una URL válida.",
            },
        },
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    });

// RELACIÓN 1:1
UserModel.hasOne(ProfileModel, {
    foreignKey: "user_id",
    as: "profile",
});

ProfileModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    as: "user",
});
