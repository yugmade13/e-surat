import express from "express";
import {
    deleteRequestToEveryone,
    getRequestToEveryone,
    getRequestToEveryoneById,
    createRequestToEveryone,
    updateRequestToEveryone
} from "../controllers/RequestToEveryone.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const Router = express.Router();

Router.get("/request-to-everyone", verifyUser, getRequestToEveryone);
Router.get("/request-to-everyone/:id", verifyUser, getRequestToEveryoneById);
Router.post("/request-to-everyone", verifyUser, createRequestToEveryone);
Router.patch("/request-to-everyone/:id", verifyUser, updateRequestToEveryone);
Router.delete("/request-to-everyone/:id", verifyUser, deleteRequestToEveryone);

export default Router;