import express from "express";
import { financePlanController } from "../controllers/financePlan";
const financePlanRouter = express.Router();

financePlanRouter.get("/:id", financePlanController.getByUserId);
financePlanRouter.get("/id/:id", financePlanController.getId);
financePlanRouter.post("/", financePlanController.post);
financePlanRouter.put("/:id", financePlanController.put);
financePlanRouter.delete("/:id", financePlanController.delete);

export default financePlanRouter;
