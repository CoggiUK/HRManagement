import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class Department extends BaseModel {
  static initModel(sequelize) {
    return super.init(
      {
        departmentId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'DepartmentId'
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
        modelName: 'Department',
        tableName: 'Departments',
        timestamps: true,
        paranoid: true
      }
    );
  }
}

export default Department;
