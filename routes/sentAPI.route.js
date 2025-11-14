import express from "express"
import { sendAPIKey } from "../controllers/sendAPI.controller.js";


const sendAPITouter = express.Router();

sendAPITouter.get("/send-api", sendAPIKey);

export default sendAPITouter;