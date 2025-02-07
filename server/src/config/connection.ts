//Connection.ts
import { Sequelize } from 'sequelize';
import { UserFactory } from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();
//import { User } from '../models/user.js';



//  Create sequelize connection
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );
  
    UserFactory(sequelize);
    
    console.log('Sequlize', sequelize)


    export default sequelize;