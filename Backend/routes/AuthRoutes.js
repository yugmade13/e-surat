import express from "express";
import {Login, Me, Logout, Register} from "../controllers/Auth.js";

const Router = express.Router();

Router.post("/register", Register);
Router.post("/login", Login);
Router.get("/me", Me);
Router.delete("/logout", Logout);

export default Router;