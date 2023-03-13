import { DataTypes } from 'sequelize';
import { database } from '../../database/database.js';

const DayResult = database.define('am_day_result', {
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
}, {
  timestamps: false,
});

export { DayResult };