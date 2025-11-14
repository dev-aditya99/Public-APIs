import dotenv from "dotenv";
dotenv.config();

export const sendAPIKey = async (req, res) => {
    try {
        let key = process.env.GEMINI_API_KEY;

        if (!key) {
            return res.status(400).json({ error: "API Key not found" });
        }
        return res.status(201).json(key);
    } catch (error) {
        console.error("Error in getUserForSideBar Controller : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}