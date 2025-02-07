import { Sequelize } from 'sequelize';
import { UserFactory, User } from './user.js';
import { TaskFactory,Task } from './tasks.js';
import { BadgeFactory, Badge } from './badge.js';
import { UserBadgeFactory, UserBadge } from './userBadge.js';
import dotenv from 'dotenv';

dotenv.config();


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

  console.log('sequelize instance created', sequelize)

UserFactory(sequelize);
console.log('user table created')
TaskFactory(sequelize);
console.log('task table created')
BadgeFactory(sequelize);
console.log('badge table created')
UserBadgeFactory(sequelize);
console.log('user badge table created')

// A user can have many tasks
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId'});

// Users and badges are connected via the UserBadge join table
User.belongsToMany(Badge, {
    through: 'UserBadge',
    foreignKey: 'user_id',
    otherKey: 'badge_id',
    onDelete: 'CASCADE',
});
Badge.belongsToMany(User, {
    through: 'UserBadge',
    foreignKey: 'badge_id',
    otherKey: 'user_id',
    onDelete: 'CASCADE',
});

export { sequelize, User, Task, Badge, UserBadge };
