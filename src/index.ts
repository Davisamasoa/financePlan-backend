import express from "express";
import { Request, Response } from "express";
import userRouter from "./routes/User";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.listen(3000, () => console.log("Server is running on PORT 3000"));
