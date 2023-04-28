import { DataTypes } from 'sequelize';
import { database } from '../../database/database.js';

const CashboxLog = database.define('am_cashbox_logs', {
  id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  time: {
    type: DataTypes.TIME,
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

  input_cash: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  output_cash: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  input_non_cash: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  output_non_cash: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  desctiption: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  shifts_id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
  }
}, {
  timestamps: false,
});

export { CashboxLog };