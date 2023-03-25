import express from "express";
import financePlanRouter from "./routes/financePlan";

import userRouter from "./routes/user";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/financePlan", financePlanRouter);

app.listen(3000, () => console.log("Server is running on PORT 3000"));
