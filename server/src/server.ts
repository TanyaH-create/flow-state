
//server.ts is the main entry point for the Node.js and express application
//used to load environment variables (like API keys)

//express is the framework for handling HTTP requests and responses
import express from 'express';

// TODO: Create Sequelize connector from models folder and import 
// in to connect to postgres server. 
//manages databse connection
import sequelize from './config/connection.js';

//application route handlers
import routes from './routes/index.js';

//express is the framework for handling HTTP requests and responses
const app = express();

//use port defined in environment variables or 3001 if not defined
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

//Middlewares:
//handle JSON data
app.use(express.json());
//turn on routes: mounts all defined routes imported from 
//routes (.routes/index.js) so the server can handle API endpoints
app.use(routes);


//connect to postgres server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
