import Router from 'express';
import dayResultsControllers from './dayResults.controllers.js';

const dayResultsRoutes = Router();

dayResultsRoutes.route('/')
  .get(dayResultsControllers.getAllDayResults);

export { dayResultsRoutes };