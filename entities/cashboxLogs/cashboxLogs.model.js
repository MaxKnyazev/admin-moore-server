import { DataTypes } from 'sequelize';
import { database } from '../../database/database.js';

const CashboxLog = database.define('am_cashbox_logs', {
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

  input: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  output: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  desctiption: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  timestamps: false,
});

export { CashboxLog };