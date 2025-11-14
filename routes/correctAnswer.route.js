import express from "express"
import { correctAnswer } from "../controllers/correctAnswer.controller.js";


const correctAnswerRouter = express.Router();

correctAnswerRouter.post("/correct-answer", correctAnswer);

export default correctAnswerRouter;