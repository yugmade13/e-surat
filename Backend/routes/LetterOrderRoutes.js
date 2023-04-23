import express from "express";
import {
    deleteLetterOrder,
    getLetterOrder,
    getLetterOrderById,
    createLetterOrder,
    updateLetterOrder,
    createOrder,
    updateOrder,
} from "../controllers/LetterOrder.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const Router = express.Router();

Router.get("/orders", verifyUser, getLetterOrder);
Router.get("/orders/:id", verifyUser, getLetterOrderById);
Router.post("/orders", verifyUser, createLetterOrder);
Router.post("/orders/develop", verifyUser, createOrder);
Router.patch("/orders/:id", verifyUser, updateLetterOrder);
Router.patch("/orders/develop/:id", verifyUser, updateOrder);
Router.delete("/orders/:id", verifyUser, deleteLetterOrder);

export default Router;