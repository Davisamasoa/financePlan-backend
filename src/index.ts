import express from "express";
import expenseRouter from "./routes/expense";
import financePlanRouter from "./routes/financePlan";

import userRouter from "./routes/user";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

app.use("/user", userRouter);
app.use("/financePlan", financePlanRouter);
app.use("/expense", expenseRouter);

app.listen(port, () => console.log(`[server] Server is running on ${process.env.URL}:${port}/`));
