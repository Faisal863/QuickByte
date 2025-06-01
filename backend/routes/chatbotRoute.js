import express from 'express';
import Item from '../modals/item.js';
import fetch from 'node-fetch'; // Ensure this is installed: npm install node-fetch

const chatbotrouter = express.Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "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"; // Use your sk-or-... key here

chatbotrouter.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    const items = await Item.find();

   const menuSummary = items.map((i) => {
  return `${i.name} - ${i.description}. Price: ₹${i.price}. Calories: ${i.calories ?? 'N/A'} kcal. Protein: ${i.protein}g, Carbs: ${i.carbs}g, Fat: ${i.fat}g. ${
    i.isVeg ? 'Vegetarian' : 'Non-Vegetarian'
  }. ${i.allergens?.length ? `Allergens: ${i.allergens.join(', ')}` : ''}`;
}).join('\n');

    const messages = [
      {
        role: 'system',
        content:
          'You are a helpful assistant for a food delivery app. Use the menu information to answer questions about food items, ingredients, calories, and price.',
      },
      {
        role: 'user',
        content: `Here is the menu:\n${menuSummary}\n\nNow answer this user query: ${message}`,
      },
    ];

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo', // You can also try 'google/gemini-pro' or 'mistralai/mixtral-8x7b' etc.
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter error:', errorData);
      return res.status(500).json({ error: 'OpenRouter API error', details: errorData });
    }

    const data = await response.json();
    console.log('OpenRouter response:', JSON.stringify(data, null, 2));
    const answer = data.choices?.[0]?.message?.content || 'Sorry, no response generated.';

    res.json({ answer });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

export default chatbotrouter;
