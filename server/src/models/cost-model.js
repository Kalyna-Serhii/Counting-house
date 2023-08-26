import { DataTypes, sequelize } from '../database/database.config';

const CostModel = sequelize.define(
  'CostItem',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: {
        len: [2, 255],
      },
    },
    comment: {
      type: DataTypes.TEXT(),
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sum: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'costs',
    timestamps: false, // отключение генерации полей createdAt и updatedAt
  },
);

export default CostModel;
