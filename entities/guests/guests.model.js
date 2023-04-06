import { DataTypes } from 'sequelize';
import { database } from '../../database/database.js';

const Guest = database.define('am_guest', {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  users_id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  },
  
  users_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  group: {
    type: DataTypes.STRING,
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

  minutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  for_payment: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  tariffs_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  cash: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  non_cash: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  result_money: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  payment_description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  break_start_time: {
    type: DataTypes.TIME,
    allowNull: true,
  },

  break_stop_time: {
    type: DataTypes.TIME,
    allowNull: true,
  },

  break_minutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  is_break: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
}, {
  timestamps: false,
});

export { Guest };