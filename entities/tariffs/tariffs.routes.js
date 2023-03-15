import Router from 'express';
import tariffsControllers from './tariffs.controllers.js';

const tariffsRoutes = Router();

tariffsRoutes.route('/')
  .get(tariffsControllers.getAllTariffs);

tariffsRoutes.route('/add')
  .post(tariffsControllers.addTariff);

tariffsRoutes.route('/edit/:id')
  .put(tariffsControllers.editTariff);
export { tariffsRoutes };