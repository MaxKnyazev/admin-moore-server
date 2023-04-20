import { Shift } from './shifts.model.js';

class ShiftsServices {
  getAllShifts = async () => {
    try {
      const shifts = await Shift.findAll({
        raw: true,
      });
      
      return shifts;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new ShiftsServices();