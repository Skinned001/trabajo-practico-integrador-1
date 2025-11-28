import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.controllers.js";

export const userRoutes = Router();

userRoutes.get("/users", getAllUsers);
userRoutes.get("/users/:id", getUserById);
userRoutes.post("/users", createUser);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id",deleteUser);

export default userRoutes;