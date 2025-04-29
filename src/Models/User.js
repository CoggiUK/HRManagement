import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class User extends BaseModel {
    static initModel(sequelize) {
        return super.init(
            {
                UserId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    field: 'UserId'
                },
                UserName: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    field: 'UserName'
                },
                Password: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    field: 'Password'
                },
                Role: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    field: 'Role'
                }
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'Users',
                timestamps: true,
                paranoid: true
            }
        );
    }

    // Định nghĩa quan hệ với Employee nếu cần
    static associate(models) {
        this.hasOne(models.Employee, {
            foreignKey: 'UserId',
            as: 'employee'
        });
    }
}

export default User;
