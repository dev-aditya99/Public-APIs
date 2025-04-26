import express from "express"
import http from "http"
import cors from "cors"
import passwordRouter from "./routes/password_generator.route.js";

const PORT = 5000
const app = express();

app.use(express.json());

const server = http.createServer(app);

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // The frontend domain
    credentials: true, // This allows cookies to be sent in cross-origin requests
    methods: ["POST", "GET"]
}));

app.use("/auth", passwordRouter);

server.listen(PORT, () => {
    console.log("Server Running on PORT " + PORT);
});