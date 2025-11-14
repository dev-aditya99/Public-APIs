export default async function getCorrectAnswer(questionText, optionsTexts, key) {

    const GEMINI_API_KEY = key;
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

    console.log("AutoSolver: Querying Gemini API...");

    const systemPrompt = `You are an expert at answering multiple-choice questions. 
    Given a question and a list of options, your sole task is to determine the correct option. 
    Respond ONLY with the zero-based index of the correct option. 
    Do not provide any explanation, preamble, or other text. 
    For example, if the second option is correct, respond with: 1`;

    const userQuery = `Question: ${questionText}

Options:
${optionsTexts.map((opt, i) => `${i}: ${opt}`).join('\n')}

What is the zero-based index of the correct option?`;

    const payload = {
        contents: [{
            parts: [{ text: userQuery }]
        }],
        // Use search grounding to find real-time info
        tools: [{
            "google_search": {}
        }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
        generationConfig: {
            temperature: 0.0, // Be deterministic
            maxOutputTokens: 10,
        }
    };

    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
            // Parse the index from the response
            const index = parseInt(text.trim(), 10);

            if (!isNaN(index) && index >= 0 && index < optionsTexts.length) {
                console.log(`AutoSolver: Gemini selected index ${index}`);
                return index;
            } else {
                console.warn(`AutoSolver: Gemini gave invalid response: "${text}"`);
            }
        } else {
            console.warn("AutoSolver: No text in Gemini response.", result);
        }

    } catch (error) {
        console.error("AutoSolver: Error calling Gemini API.", error);
        if (GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
            console.error("CRITICAL: You have not set your GEMINI_API_KEY in contentScript.js!");
        }
    }

    return null; // Fallback
}