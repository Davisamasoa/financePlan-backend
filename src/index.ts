import express from "express";
import expenseRouter from "./routes/expense";
import financePlanRouter from "./routes/financePlan";
import loginRouter from "./routes/login";
import userRouter from "./routes/user";
import { checkToken } from "./auth";
import verifyEmailRouter from "./routes/verifyEmail";
import forgetPasswordRouter from "./routes/forgetPassword";
import goalRouter from "./routes/goal";

require("dotenv");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});
app.get("/", (req, res) => {
	res.json({ msg: "Hello World!" });
});
app.use("/user", userRouter);
app.use("/financePlan", checkToken, financePlanRouter);
app.use("/expense", checkToken, expenseRouter);
app.use("/goal", checkToken, goalRouter);
app.use("/login", loginRouter);
app.use("/verifyEmail", verifyEmailRouter);
app.use("/forgetPassword", forgetPasswordRouter);

app.listen(port, () => console.log(`[server] Server is running on ${process.env.URL}:${port}/`));
