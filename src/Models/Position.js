import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class Position extends BaseModel {
  static initModel(sequelize) {
    return super.init(
      {
        positionId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'PositionId'
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          field: 'Name'
        },
        ...this.initBaseFields()
      },
      {
        sequelize,
        modelName: 'Position',
        tableName: 'Positions',
        timestamps: true,
        paranoid: true
      }
    );
  }
}

export default Position;
