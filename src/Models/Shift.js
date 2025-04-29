import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class Shift extends BaseModel {
  static initModel(sequelize) {
    this.init(
      {
        shiftId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        startTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        endTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        ...this.initBaseFields(),
      },
      {
        sequelize,
        modelName: 'Shift',
        tableName: 'Shifts',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}

export default Shift;
