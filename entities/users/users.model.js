import { DataTypes } from 'sequelize';
import { database } from '../../database/database.js';

const User = database.define('am_user', {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
  login: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

export { User };