import Router from 'express';
import cashboxLogsControllers from './cashboxLogs.controllers.js';

const cashboxLogsRoutes = Router();

cashboxLogsRoutes.route('/')
  .get(cashboxLogsControllers.getCashboxLogs);

cashboxLogsRoutes.route('/add')
  .post(cashboxLogsControllers.addCashboxLog);

cashboxLogsRoutes.route('/getByShiftsId/:shiftsId')
  .get(cashboxLogsControllers.getCashboxLogsByShiftsId);

export { cashboxLogsRoutes };