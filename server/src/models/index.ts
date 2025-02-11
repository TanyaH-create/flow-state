//import { Sequelize } from 'sequelize';
import sequelize from '../config/connection.js';
import { UserFactory, User } from './user.js';
import { TaskFactory,Task } from './tasks.js';
import { BadgeFactory, Badge } from './badge.js';
import { UserBadgeFactory, UserBadge } from './userBadge.js';

UserFactory(sequelize);
TaskFactory(sequelize);
BadgeFactory(sequelize);
UserBadgeFactory(sequelize);


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


// Sync database with models (apply changes to schema)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });

export { sequelize, User, Task, Badge, UserBadge };
