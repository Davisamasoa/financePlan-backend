import express from "express";
import { goalController } from "../controllers/goal";
const goalRouter = express.Router();

goalRouter.get("/:financePlanId", goalController.get);
goalRouter.post("/", goalController.post);
goalRouter.put("/:id", goalController.put);
goalRouter.delete("/:id", goalController.delete);

export default goalRouter;
