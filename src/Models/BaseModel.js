import { Model, DataTypes } from 'sequelize';

class BaseModel extends Model {
  static initBaseFields() {
    return {
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'CreatedAt'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        field: 'UpdatedAt'
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'DeletedAt'
      }
    };
  }

  static initModel(sequelize) {
    return this.init(
      {
        ...this.initBaseFields()
      },
      {
        sequelize,
        modelName: this.name,
        tableName: `${this.name}s`,
        timestamps: true,
        paranoid: true,
        underscored: false
      }
    );
  }
}

export default BaseModel;
