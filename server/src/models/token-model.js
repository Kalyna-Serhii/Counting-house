import UserModel from './user-model';
import { DataTypes, sequelize } from '../database/database.config';

const TokenModel = sequelize.define(
  'Token',
  {
    userId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
  },
  {
    tableName: 'tokens',
    timestamps: false, // отключение генерации полей createdAt и updatedAt
  },
);

TokenModel.belongsTo(UserModel, { foreignKey: 'userId' });

export default TokenModel;
