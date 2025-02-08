"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import authRoutes from './routes/auth'
const routes_1 = __importDefault(require("./routes/routes"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("He there");
});
// app.use("/auth" , authRoutes)
app.use("/api", routes_1.default);
app.listen(PORT, () => {
    (0, db_1.default)();
    console.log("Server is started and running");
});
