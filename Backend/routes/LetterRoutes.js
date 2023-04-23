import express from "express";
import {
    deleteLetter,
    getLetterById,
    getLetters,
    createLetter,
    updateLetter
} from "../controllers/Letters.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const Router = express.Router();

Router.get("/letters", verifyUser, getLetters);
Router.get("/letters/:id", verifyUser, getLetterById);
Router.post("/letters", verifyUser, createLetter);
Router.patch("/letters/:id", verifyUser, updateLetter);
Router.delete("/letters/:id", verifyUser, deleteLetter);

export default Router;