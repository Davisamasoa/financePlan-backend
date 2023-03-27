import express from "express";
import { loginController } from "../controllers/login";
const loginRouter = express.Router();

loginRouter.post("/", loginController.post);

export default loginRouter;
