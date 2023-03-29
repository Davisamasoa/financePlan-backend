import express from "express";
import { forgetPasswordController } from "../controllers/forgetPassword";
const forgetPasswordRouter = express.Router();

forgetPasswordRouter.post("/", forgetPasswordController.post);
forgetPasswordRouter.put("/", forgetPasswordController.put);

export default forgetPasswordRouter;
