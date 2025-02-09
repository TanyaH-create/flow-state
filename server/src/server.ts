
//server.ts 
import express from 'express';
import { sequelize } from './models/index.js';
import routes from './routes/index.js';


const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static('../client/dist'));
app.use(express.json()); //parse all JSON request boodies
app.use(routes); //mount all API endpoints from routes



// Create an endpoint to fetch the Zen quote
app.get("/zen-quote", async (_req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/quotes/");
    const data = await response.json();
    res.json(data); // Send the fetched quote data back to the frontend
  } catch (error) {
    console.error("Error fetching Zen quote:", error);
    res.status(500).json({ error: "Failed to fetch Zen quote" });
  }
});




//.sync connects postgres database to server before starting the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  });
});
