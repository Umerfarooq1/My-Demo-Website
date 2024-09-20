const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/chat', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const gptResponse = response.data.choices[0].message.content;
        res.json({ response: gptResponse });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch response from GPT' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
