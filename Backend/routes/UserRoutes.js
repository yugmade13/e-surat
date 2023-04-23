import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUserWithoutPassword,
    deleteUser,
    updateUserPassword,
    createUserWithProfile,
} from "../controllers/Users.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const Router = express.Router();

Router.get("/users", verifyUser, getUsers);
Router.get("/users/:id", verifyUser, getUserById);

Router.post("/users", verifyUser, createUser);
Router.post("/users/register", verifyUser, createUserWithProfile);

Router.patch("/users/:id", verifyUser, updateUserWithoutPassword);
Router.patch("/users/change-password/:id", verifyUser, updateUserPassword);

Router.delete("/users/:id", verifyUser, deleteUser);

export default Router;