import { DataTypes, sequelize } from '../database/database.config';

const UserModel = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      required: true,
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        len: [2, 15],
      },
      required: true,
    },
    surname: {
      type: DataTypes.STRING(15),
      validate: {
        len: [0, 15],
      },
    },
    gender: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate: {
        isIn: [['man', 'woman']],
      },
      defaultValue: 'man',
    },
    phone: {
      type: DataTypes.STRING(13),
      allowNull: false,
      validate: {
        len: [13],
      },
      required: true,
    },
    password: {
      type: DataTypes.STRING(60),
      validate: {
        len: [60],
      },
    },
    email: {
      type: DataTypes.STRING(50),
      validate: {
        len: [0, 50],
      },
    },
    floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[...Array(10).keys()].slice(1)],
      },
      required: true,
    },
    room: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[...Array(100).keys()].slice(1)],
      },
      required: true,
    },
    role: {
      type: DataTypes.STRING(9),
      allowNull: false,
      validate: {
        isIn: [['user', 'moderator', 'admin']],
      },
      defaultValue: 'user',
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    timestamps: false, // отключение генерации полей createdAt и updatedAt
  },
);

export default UserModel;
