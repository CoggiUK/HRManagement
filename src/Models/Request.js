import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class Request extends BaseModel {
  static initModel(sequelize) {
    this.init(
      {
        requestId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        employeeId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Employees',
            key: 'employeeId',
          },
        },
        requestTypeId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'RequestTypes',
            key: 'requestTypeId',
          },
        },
        startDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING(20),
          allowNull: false,
          defaultValue: 'Pending',
        },
        reason: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        ...this.initBaseFields(),
      },
      {
        sequelize,
        modelName: 'Request',
        tableName: 'Requests',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}

export default Request;
