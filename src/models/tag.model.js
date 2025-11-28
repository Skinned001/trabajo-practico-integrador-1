import { DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../config/database.js";

export const TagModel = sequelize.define("Tag", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        len: [2,30]
    },
},
    {
        timestamps: true,
        paranoid: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    });