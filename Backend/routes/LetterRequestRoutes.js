import express from "express";
import {
    deleteLetterRequest,
    getLetterRequestById,
    getLetterRequests,
    createLetterRequest,
    updateLetterRequest,
    createLetterRequestForEveryone,
    getLetterRequestsMonth
} from "../controllers/LetterRequests.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const Router = express.Router();

Router.get("/request-letters", verifyUser, getLetterRequests);
Router.get("/request-letters/:id", verifyUser, getLetterRequestById);
Router.post("/letter-request-month", getLetterRequestsMonth);
Router.post("/request-letters", verifyUser, createLetterRequest);
Router.post("/request-letters/everyone", verifyUser, createLetterRequestForEveryone);
Router.patch("/request-letters/:id", verifyUser, updateLetterRequest);
Router.delete("/request-letters/:id", verifyUser, deleteLetterRequest);


export default Router;