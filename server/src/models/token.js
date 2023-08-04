const { sequelize, DataTypes } = require('../database/db');
const User = require('./user');

const Token = sequelize.define('Token', {
  refreshToken: {
    type: DataTypes.STRING(),
    required: true,
  },
});

Token.belongsTo(User);
