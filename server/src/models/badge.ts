import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

export interface BadgeAttributes {
    id: number;
    name: string;
    description: string;
}

export interface BadgeCreationAttributes extends Optional<BadgeAttributes, 'id'> {}

export class Badge extends Model<BadgeAttributes, BadgeCreationAttributes> implements BadgeAttributes {
    public id!: number;
    public name!: string;
    public description!: string;
}

export function BadgeFactory(sequelize: Sequelize): typeof Badge {
    Badge.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'badges',
            sequelize,
        }
    );

    return Badge;
}