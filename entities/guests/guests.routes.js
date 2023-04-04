import Router from 'express';
import guestsControllers from './guests.controllers.js';

const guestsRoutes = Router();

guestsRoutes.route('/')
  .get(guestsControllers.getAllGuests);

guestsRoutes.route('/add')
  .post(guestsControllers.addGuest);

guestsRoutes.route('/edit/:id')
  .put(guestsControllers.editGuest);

guestsRoutes.route('/calculate/:id')
  .put(guestsControllers.calculateMoney);

guestsRoutes.route('/break/:id')
  .put(guestsControllers.calculateBreak);

export { guestsRoutes };