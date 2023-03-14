import Router from 'express';
import cashboxLogsControllers from './cashboxLogs.controllers.js';

const cashboxLogsRoutes = Router();

cashboxLogsRoutes.route('/')
  .get(cashboxLogsControllers.getCashboxLogs);

export { cashboxLogsRoutes };