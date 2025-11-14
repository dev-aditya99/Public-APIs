import dotenv from "dotenv";
import getCorrectAnswer from "./utils/getCorrectAnswer.js";
dotenv.config();

export const correctAnswer = async (req, res) => {
    try {
        let { questionText, optionsTexts } = req.body;

        if (!questionText || !optionsTexts || !Array.isArray(optionsTexts)) {
            return res.status(400).json({ error: "Invalid input data" });
        }

        let key = process.env.GEMINI_API_KEY;

        if (!key) {
            return res.status(400).json({ error: "API Key not found" });
        }
        const keyIndex = await getCorrectAnswer(questionText, optionsTexts, key);

        if (!keyIndex && keyIndex !== 0) {
            return res.status(400).json({ error: "Could not determine correct answer" });
        }


        return res.status(201).json({ correctAnswerIndex: keyIndex });
    } catch (error) {
        console.error("Error in getUserForSideBar Controller : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}