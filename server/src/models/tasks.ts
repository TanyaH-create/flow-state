import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

export interface TaskAttributes {
  id: number;
  userId: number;
  title: string;
  description: string;
  isComplete: boolean;
}

export interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'isComplete'> {}

export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public isComplete!: boolean;
}

export function TaskFactory(sequelize: Sequelize): typeof Task {
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',  // match table name in UserFactory
                    key: 'id',
                },
                onUpdate: 'CASCADE', //if change to user id occurs change here
                onDelete: 'CASCADE',
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isComplete: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            tableName: 'tasks',
            sequelize,
        }
    );

        return Task;
    }