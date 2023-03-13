import Router from 'express';
import guestsControllers from './guests.controllers.js';

const guestsRoutes = Router();

guestsRoutes.route('/')
  .get(guestsControllers.getAllGuests);

guestsRoutes.route('/add')
  .post(guestsControllers.addGuest);

guestsRoutes.route('/edit/:id')
  .put(guestsControllers.editGuest);
export { guestsRoutes };