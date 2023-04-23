import express from "express";
import {
    deleteUserProfile,
    getUserProfileById,
    getUserProfiles,
    createUserProfile,
    updateUserProfile
} from "../controllers/UserProfiles.js";
import {getUserByIdWithProfile} from "../controllers/UserProfiles.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const Router = express.Router();

Router.get("/profiles", verifyUser, getUserProfiles);
Router.get("/profiles/:id", verifyUser, getUserProfileById);
Router.get("/users-profile/:id", verifyUser, getUserByIdWithProfile);
Router.post("/profiles", verifyUser, createUserProfile);
Router.patch("/profiles/:id", verifyUser, updateUserProfile);
Router.delete("/profiles/:id", verifyUser, deleteUserProfile);

export default Router;