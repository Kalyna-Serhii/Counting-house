const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'admin', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Синхронизация всех моделей с базой данных
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = { sequelize, DataTypes };
