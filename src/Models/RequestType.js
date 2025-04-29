import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class RequestType extends BaseModel {
  static initModel(sequelize) {
    this.init(
      {
        requestTypeId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        ...this.initBaseFields(),
      },
      {
        sequelize,
        modelName: 'RequestType',
        tableName: 'RequestTypes',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}

export default RequestType;
