import shiftsServices from './shifts.services.js';

class ShiftsControllers {
  getAllShifts = async (req, res) => {
    try {
      const shifts = await shiftsServices.getAllShifts();
      
      return res.status(200).json({
        shifts,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}

export default new ShiftsControllers();