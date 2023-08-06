const { sequelize, DataTypes } = require('../database/db');
const User = require('./user');

const Token = sequelize.define('Token', {
  refreshToken: {
    type: DataTypes.TEXT(),
    required: true,
  },
});

Token.belongsTo(User);

module.exports = Token;
