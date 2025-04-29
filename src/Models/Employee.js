import { DataTypes } from 'sequelize';
import BaseModel from './BaseModel.js';

class Employee extends BaseModel {
  static initModel(sequelize) {
    return super.init(
      {
        EmployeeId: {  // Đổi từ employeeId thành EmployeeId
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'EmployeeId'
        },
        FullName: {    // Đổi từ fullName thành FullName
          type: DataTypes.STRING(100),
          allowNull: false,
          field: 'FullName'
        },
        DateOfBirth: { // Đổi từ dateOfBirth thành DateOfBirth
          type: DataTypes.DATE,
          field: 'DateOfBirth'
        },
        Gender: { // Đổi từ gender thành Gender
          type: DataTypes.STRING(10),
          field: 'Gender'
        },
        PhoneNumber: { // Đổi từ phoneNumber thành PhoneNumber
          type: DataTypes.STRING(20),
          field: 'PhoneNumber'
        },
        Email: { // Đổi từ email thành Email
          type: DataTypes.STRING(100),
          field: 'Email'
        },
        Address: { // Đổi từ address thành Address
          type: DataTypes.STRING(255),
          field: 'Address'
        },
        HireDate: { // Đổi từ hireDate thành HireDate
          type: DataTypes.DATE,
          field: 'HireDate'
        },
        ...this.initBaseFields()
      },
      {
        sequelize,
        modelName: 'Employee',
        tableName: 'Employees',
        timestamps: true,
        paranoid: true
      }
    );
  }
}

export default Employee;
