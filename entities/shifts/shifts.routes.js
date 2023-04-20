import Router from 'express';
import shiftsControllers from './shifts.controllers.js';

const shiftsRoutes = Router();

shiftsRoutes.route('/')
  .get(shiftsControllers.getAllShifts);

export { shiftsRoutes };