const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'admin', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = { sequelize, DataTypes };
