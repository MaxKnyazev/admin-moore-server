import { DataTypes } from 'sequelize';
import { database } from '../../database/database.js';

const Shift = database.define('am_shift', {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  stop_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },

  stop_time: {
    type: DataTypes.TIME,
    allowNull: true,
  },

  users_id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  
  users_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  start_money: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  guests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  cash: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  non_cash: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  result_money: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  is_holiday: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
}, {
  timestamps: false,
});

export { Shift };