require('dotenv').config();
import { Sequelize } from 'sequelize';

const Config = require('./config');

const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const dbVars = Config[nodeEnv];

const dbUsername = dbVars.username ? dbVars.username : '',
  dbPassword = dbVars.password ? dbVars.password : '',
  dbDatabase = dbVars.database ? dbVars.database : '',
  dbHost = dbVars.host ? dbVars.host : '',
  dbDialect = dbVars.dialect;

const sequelizeConnection = new Sequelize(dbDatabase, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  logging: false,
});

export default sequelizeConnection;
