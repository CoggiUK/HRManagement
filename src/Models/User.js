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
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          field: 'UserName'
        },
        Password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: 'Password'
        },
        Role: {
          type: DataTypes.STRING(20),
          allowNull: false,
          field: 'Role'
        }
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: true
      }
    );
  }
}

export default User;
