const { sequelize, DataTypes } = require('./db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 15],
      },
    },
    surname: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 15],
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['man', 'woman']],
      },
      defaultValue: 'man',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [13],
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60],
      },
    },
    email: {
      type: DataTypes.STRING,
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
    },
    room: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[...Array(100).keys()].slice(1)],
      },
    },
    role: {
      type: DataTypes.STRING,
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
  }
);

module.exports = User;
