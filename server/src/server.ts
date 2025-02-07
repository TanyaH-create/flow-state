
//server.ts 
import express from 'express';
import sequelize from './config/connection.js';
//import { sequelize } from './models/index.js';
import routes from './routes/index.js';

console.log('Server.ts is loaded')


const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.static('../client/dist'));
app.use(express.json()); //parse all JSON request boodies
app.use(routes); //mount all API endpoints from routes




//.sync connects postgres database to server before starting the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  });
});
