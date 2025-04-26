import express from "express"
import { generatePassword } from "../controllers/generate_password.controller.js";

const passwordRouter = express.Router();

passwordRouter.post("/generate-password", generatePassword);

export default passwordRouter;