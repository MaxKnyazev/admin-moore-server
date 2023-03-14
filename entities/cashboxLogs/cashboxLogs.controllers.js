import cashboxLogsServices from './cashboxLogs.services.js';

class CashboxLogsControllers {
  getCashboxLogs = async (req, res) => {
    try {
      const cashboxLogs = await cashboxLogsServices.getCashboxLogs();
      
      return res.status(200).json({
        cashboxLogs,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  addCashboxLog = async (req, res) => {
    try {
      const options = req.body;
      const cashboxLog = await cashboxLogsServices.addCashboxLog(options);
      
      return res.status(200).json({
        cashboxLog,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

}

export default new CashboxLogsControllers();