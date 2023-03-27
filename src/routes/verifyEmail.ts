import express from "express";
import { verifyEmailController } from "../controllers/verifyEmail";
const verifyEmailRouter = express.Router();

verifyEmailRouter.post("/", verifyEmailController.post);
verifyEmailRouter.put("/", verifyEmailController.put);

export default verifyEmailRouter;
