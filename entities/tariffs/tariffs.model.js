import { DataTypes } from 'sequelize';
import { database } from '../../database/database.js';

const Tariff = database.define('am_tariffs', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: false,
});

export { Tariff };