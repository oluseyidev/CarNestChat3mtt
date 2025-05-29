// import OpenAI from 'openai';
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// app.post('/api/chat', async (req, res) => {
//   try {
//     const { message } = req.body;

//     const chatCompletion = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: message }],
//     });

//     res.json({ reply: chatCompletion.choices[0].message.content });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Something went wrong.' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Dummy AI response logic
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Simulate an AI response
    const reply = `You said: "${message}". This is a dummy AI response.`;

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
