import generatePassOrPin from "./utils/generatePassOrPin.js";

export const generatePassword = async (req, res) => {
    try {
        const { toggleValue } = req.body;

        const response = generatePassOrPin(toggleValue)
        res.status(201).json(response);
    } catch (error) {
        console.error("Error in getUserForSideBar Controller : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}