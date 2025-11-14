import express from "express"
import http from "http"
import cors from "cors"
import passwordRouter from "./routes/password_generator.route.js";
import dotenv from "dotenv"
import sendAPITouter from "./routes/sentAPI.route.js";
import correctAnswerRouter from "./routes/correctAnswer.route.js";

dotenv.config()

const PORT = 5000
const app = express();

app.use(express.json());

const server = http.createServer(app);

app.use(cors({
    origin: "*", // The frontend domain
    credentials: true, // This allows cookies to be sent in cross-origin requests
    methods: ["POST", "GET"]
}));

app.use("/auth", passwordRouter);
app.use("/api", sendAPITouter);
app.use("/gemini", correctAnswerRouter);

server.listen(PORT, () => {
    console.log("Server Running on PORT " + PORT);
});