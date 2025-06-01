// const fetch = require('node-fetch');
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));
const apiKey = process.env.GEMINI_API_KEY;

console.log('API Key:', apiKey ? `${apiKey} Loaded` : 'NOT loaded');

class ChatController {
    async sendMessage(req, res) {

        // Accept an array of messages for context
        const { messages } = req.body;
        try {
            // Build a single context string from the array
            const context = messages.map(m => `${m.sender === 'user' ? 'User' : 'Bot'}: ${m.text}`).join('\n');
            const response = await this.getResponse(context);
            res.status(200).json({ response });
        } catch (error) {
            res.status(500).json({ error: 'Error sending message' });
        }
    }
    async getResponse(message) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        //const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const headers = {
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify({
            contents: [{
                parts: [{ text: message }],
                role: "user"
            }]
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body
            });

            const status = response.status;
            let text = await response.text();

            console.error('API status:', status);
            console.error('API raw response:', text);

            let data;
            try {
                data = JSON.parse(text);
            } catch (jsonError) {
                return `Error: Non-JSON response from API. Status: ${status}. Body: ${text}`;
            }

            // Extract the Gemini response text
            let geminiText = '';
            if (data.candidates && data.candidates[0].content.parts.length > 0) {
                geminiText = data.candidates[0].content.parts[0].text.trim();
            }
            else if (data.error) {
                return `API error: ${data.error.message}`;
            }
            else {
                return 'Sorry, no response from API.';
            }
            // Gemini sometimes returns multiple newlines
            geminiText = geminiText.replace(/\n{3,}/g, '\n\n');

            return geminiText;
        } catch (error) {
            console.error('Error communicating with API:', error);
            return 'Error communicating with API.';
        }
    }
}

module.exports = new ChatController();