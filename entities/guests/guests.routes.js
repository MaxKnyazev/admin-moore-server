import Router from 'express';
import guestsControllers from './guests.controllers.js';

const guestsRoutes = Router();

guestsRoutes.route('/')
  .get(guestsControllers.getAllGuests);

guestsRoutes.route('/add')
  .post(guestsControllers.addGuest);

export { guestsRoutes };