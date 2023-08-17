import User from './user';
import { DataTypes, sequelize } from '../database/db';

const Token = sequelize.define(
  'Token',
  {
    userId: {
      type: DataTypes.INTEGER(),
      required: true,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT(),
      required: true,
      allowNull: false,
    },
  },
  {
    tableName: 'tokens',
    timestamps: false, // отключение генерации полей createdAt и updatedAt
  },
);

Token.belongsTo(User, { foreignKey: 'userId' });

export default Token;
