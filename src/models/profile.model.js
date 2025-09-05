import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ProfileModel = sequelize.define("Profile", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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

// Relacion 1 a 1

UserModel.hasOne(ProfileModel, { foreignKey: "user_id", as:"profile" });

ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as:"profile" });

