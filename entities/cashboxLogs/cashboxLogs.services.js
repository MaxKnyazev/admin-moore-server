import { CashboxLog } from './cashboxLogs.model.js';

class CashboxLogsServices {
  getCashboxLogs = async () => {
    try {
      const cashboxLogs = await CashboxLog.findAll({
        raw: true,
      });
      
      return cashboxLogs;
    } catch (error) {
      throw new Error(error);
    }
  }

  addCashboxLog = async (options) => {
    try {
      const cashboxLog = await CashboxLog.create(options);
      
      return cashboxLog;
    } catch (error) {
      throw new Error(error);
    }
  }

  getCashboxLogsByShiftsId = async (shiftsId) => {
    try {
      const cashboxLogsByShiftsId = await CashboxLog.findAll({
        raw: true,
        where: {
          shifts_id: shiftsId,
        }
      });
      
      return cashboxLogsByShiftsId;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new CashboxLogsServices();