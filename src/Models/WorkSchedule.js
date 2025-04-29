import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class WorkSchedule extends BaseModel {
  static initModel(sequelize) {
    this.init(
      {
        scheduleId: {
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
        shiftId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Shifts',
            key: 'shiftId',
          },
        },
        workDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        ...this.initBaseFields(),
      },
      {
        sequelize,
        modelName: 'WorkSchedule',
        tableName: 'WorkSchedules',
        timestamps: true,
        paranoid: true,
      }
    );
  }
}

export default WorkSchedule;
