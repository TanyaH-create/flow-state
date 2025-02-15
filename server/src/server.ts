
//server.ts 
import express from 'express';
import { sequelize } from './models/index.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Cache for Zen quotes (updated with a date)
let zenQuoteCache: { quote: string; author: string; date: string } | null = null;
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds


app.use(express.static('../client/dist'));
app.use(express.json()); //parse all JSON request boodies
app.use(routes); //mount all API endpoints from routes

const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const GIPHY_URL='https://api.giphy.com/v1/gifs/search'

app.get('/getSticker', async (_req, res) => {
  console.log('OKAY _ GETTING THE STICKER')
  try {
    const response = await fetch(`${GIPHY_URL}?api_key=${GIPHY_API_KEY}&q=good-job&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
    const data = await response.json();

     if (data.data && data.data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.data.length); // Get a random index
        const stickerUrl = data.data[randomIndex].images.fixed_height_small.url; // Get random sticker
        return res.json({stickerUrl});
    } else {
      return res.status(404).json({ error: 'No sticker found' });
    }
  } catch (error) {
    console.error('Error fetching sticker:', error);
    return res.status(500).json({ error: 'Failed to fetch sticker from Giphy' });
  }

});



// Create an endpoint to fetch the Zen quote
app.get("/zen-quote", async (_req, res) => {

  const currentTime = Date.now();
  const todayDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    // Check if the cached quote is for today
    if (zenQuoteCache && zenQuoteCache.date === todayDate) {
      console.log('Returning cached Zen quote of the day');
      return res.json(zenQuoteCache); // Return cached data if it's for today
    }

    // Check if the cached quote has expired (i.e., more than 24 hours old)
  if (zenQuoteCache && (currentTime - new Date(zenQuoteCache.date).getTime()) < CACHE_EXPIRATION_TIME) {
    console.log('Returning cached Zen quote of the day');
    return res.json(zenQuoteCache); // Return cached data if it's still within the 24-hour window
  }


  try {
    console.log('Fetching new zen quote from API');
    const response = await fetch("https://zenquotes.io/api/quotes/");
    const data = await response.json();
    if (data && data[0]) {
      // Store the new quote and today's date in the cache
      zenQuoteCache = {
        quote: data[0].q,
        author: data[0].a,
        date: todayDate // Store today's date
      };
    };
      console.log('Fetched Zen Quote:', zenQuoteCache);
      return res.json(zenQuoteCache); // Send the fetched quote data back to the frontend
  } catch (error) {
    console.error("Error fetching Zen quote:", error);
    return res.status(500).json({ error: "Failed to fetch Zen quote" });
  }
});


//.sync connects postgres database to server before starting the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  });
});
