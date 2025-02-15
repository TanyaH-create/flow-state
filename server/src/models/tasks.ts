import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

export interface TaskAttributes {
  id: number;
  userId: number;
  title: string;
  description: string;
  isComplete: boolean;
  stickerUrl?: string;
}

export interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'isComplete' | 'stickerUrl'> {}

export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public isComplete!: boolean;
  public stickerUrl?: string;
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
            stickerUrl: {
                type: DataTypes.STRING,
                allowNull: true, // Can be null if no sticker is assigned
            },  
        },
        {
            tableName: 'tasks',
            sequelize,
        }
    );

        return Task;
    }