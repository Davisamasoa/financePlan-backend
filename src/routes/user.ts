import express from "express";
import { userController } from "../controllers/user";
const userRouter = express.Router();

userRouter.get("/", userController.get);
userRouter.post("/", userController.post);
userRouter.put("/:id", userController.put);
userRouter.delete("/:id", userController.delete);

export default userRouter;
