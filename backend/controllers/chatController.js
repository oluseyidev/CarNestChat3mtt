// // import OpenAI from 'openai';

// // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // export const handleChat = async (req, res) => {
// //   const { message } = req.body;

// //   try {
// //     const completion = await openai.chat.completions.create({
// //       model: 'gpt-3.5-turbo',
// //       messages: [{ role: 'user', content: message }],
// //     });

// //     res.json({ reply: completion.choices[0].message.content });
// //   } catch (err) {
// //     res.status(500).json({ error: 'Something went wrong with AI.' });
// //   }
// // };



// import express from 'express';
// import axios from 'axios';

// const router = express.Router();

// router.post('/chat', async (req, res) => {
//   const { message } = req.body;

//   try {
//     const response = await axios.post('http://localhost:11434/api/generate', {
//       model: 'mistral', // or whichever model you pulled
//       prompt: message,
//       stream: false
//     });

//     res.json({ reply: response.data.response });
//   } catch (err) {
//     console.error('Ollama error:', err.message);
//     res.status(500).json({ error: 'Failed to get response from Ollama' });
//   }
// });

// export default router;


// export const handleChat = async (req, res) => {
//   const { message } = req.body;

//   // Simulated assistant logic
//   let reply = "I'm your CarNest assistant. Ask me about uploading, buying, or managing your listings.";

//   const lowerMsg = message.toLowerCase();

//   if (lowerMsg.includes("upload")) {
//     reply = "To upload a car, click on 'Add Car' and fill out the form with your car’s details.";
//   } else if (lowerMsg.includes("buy")) {
//     reply = "To buy a car, browse listings and click 'Contact Seller' to proceed.";
//   } else if (lowerMsg.includes("edit") || lowerMsg.includes("update")) {
//     reply = "To update your car listing, go to 'My Listings' and click the edit icon on your car.";
//   } else if (lowerMsg.includes("delete")) {
//     reply = "To delete a car listing, open 'My Listings', click the trash icon next to the car.";
//   }

//   res.json({
//     response: {
//       role: "assistant",
//       content: reply,
//     },
//   });
// };



export const handleChat = async (req, res) => {
  const { message } = req.body;

  let reply = "I'm your CarNest assistant. Ask me about uploading, buying, or managing your listings.";

  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("upload")) {
    reply = "To upload a car, click on 'Add Car' and fill out the form with your car’s details.";
  } else if (lowerMsg.includes("buy")) {
    reply = "To buy a car, browse listings and click 'Contact Seller' to proceed.";
  } else if (lowerMsg.includes("edit") || lowerMsg.includes("update")) {
    reply = "To update your car listing, go to 'My Listings' and click the edit icon on your car.";
  } else if (lowerMsg.includes("delete")) {
    reply = "To delete a car listing, open 'My Listings', click the trash icon next to the car.";
  }

  // ✅ Return format expected by frontend
  res.json({ reply });
};


