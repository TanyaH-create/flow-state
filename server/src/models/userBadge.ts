import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

export interface UserBadgeAttributes {
    userId: number;
    badgeId: number;
}

export interface UserBadgeCreationAttributes extends Optional<UserBadgeAttributes, never> {}

export class UserBadge extends Model<UserBadgeAttributes> implements UserBadgeAttributes {
    public userId!: number;
    public badgeId!: number;
}

export function UserBadgeFactory(sequelize: Sequelize): typeof UserBadge {
    UserBadge.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            badgeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'userBadges',
            sequelize,
        }
    );

    return UserBadge;
}   