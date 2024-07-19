"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_1 = __importDefault(require("./routes/expense"));
const financePlan_1 = __importDefault(require("./routes/financePlan"));
const login_1 = __importDefault(require("./routes/login"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = require("./auth");
const verifyEmail_1 = __importDefault(require("./routes/verifyEmail"));
const forgetPassword_1 = __importDefault(require("./routes/forgetPassword"));
const goal_1 = __importDefault(require("./routes/goal"));
require("dotenv");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
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
app.use("/", express_1.default.Router().get("/", (req, res) => {
    res.json({ msg: "Funcionou!" });
}));
app.use("/user", user_1.default);
app.use("/financePlan", auth_1.checkToken, financePlan_1.default);
app.use("/expense", auth_1.checkToken, expense_1.default);
app.use("/goal", auth_1.checkToken, goal_1.default);
app.use("/login", login_1.default);
app.use("/verifyEmail", verifyEmail_1.default);
app.use("/forgetPassword", forgetPassword_1.default);
app.listen(port, () => console.log(`[server] Server is running on ${process.env.URL}:${port}/`));
