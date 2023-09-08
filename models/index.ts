import { Sequelize, Model, DataTypes } from 'sequelize';
const User = require('./user')
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db:any = {};

interface Database {
  sequelize?: Sequelize;
  Sequelize?: any;
  User?: typeof User; // Add your model types here
  // Add other model types as needed
}

let sequelize:any;
if (config.use_env_variable) {
  const databaseUrl = process.env[config.use_env_variable]
    if(typeof databaseUrl === 'string') {
      sequelize = new Sequelize(databaseUrl, config);
    }
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file:any) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file:any )=> {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: any) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
