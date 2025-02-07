import { Sequelize } from 'sequelize';
import { UserFactory, User } from './user';
import { TaskFactory,Task } from './tasks';
import { BadgeFactory, Badge } from './badge';
import { UserBadgeFactory, UserBadge } from './userBadge';

const sequelize = new Sequelize('tasks_db', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

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

export { sequelize, User, Task, Badge, UserBadge };
