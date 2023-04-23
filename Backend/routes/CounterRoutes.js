import express from "express";
import {getCounter} from "../controllers/Counter.js";

const Router = express.Router();

Router.get("/counter", getCounter);

export default Router;