import { Guest } from './guests.model.js';
// import { DayResults } from '../dayResults/dayResults.model.js';
import { convertTimeStringToObject, calculateMinutes, convertMinutesToMoney } from '../../utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

class GuestsServices {
  getAllGuests = async () => {
    try {
      const guests = await Guest.findAll({
        raw: true,
      });
      
      return guests;
    } catch (error) {
      throw new Error(error);
    }
  }

  addGuest = async (options) => {
    try {
      const guest = await Guest.create(options);
      
      return guest;
    } catch (error) {
      throw new Error(error);
    }
  }

  addGroup = async (options) => {
    try {
      const group = [];
      const group_id = uuidv4(); 
      for (const option of options) {
        const guest = await Guest.create({
          ...option,
          group_id
        });
        group.push(guest);
      }
      
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }

  editGuest = async (id, options) => {
    try {
      await Guest.update(
        options,
        {
          where: { id }
        }
      )
      
      let editedGuest = await Guest.findOne({
        where: { id }
      })
      editedGuest = editedGuest.dataValues;

      return editedGuest;
    } catch (error) {
      throw new Error(error);
    }
  }

  calculateMoney = async (id, stopTime) => {
    try {
      let editedGuest = await this.editGuest(
        id, 
        { 
          stop_time: stopTime 
        }
      )

      let minutes = calculateMinutes(
        convertTimeStringToObject(editedGuest.start_time),
        convertTimeStringToObject(editedGuest.stop_time),
      )

      editedGuest = await this.editGuest(
        id, 
        { 
          minutes, 
        }
      )

      let result = convertMinutesToMoney({
        minutes: editedGuest.minutes,
        breakMinutes: editedGuest.break_minutes,
        isHoliday: false,
        tariffsId: editedGuest.tariffs_id,
      })

      editedGuest = await this.editGuest(
        id, 
        { 
          for_payment: result.forPayment, 
          payment_description: result.paymentDescription,
        }
      )

      return editedGuest;
    } catch (error) {
      throw new Error(error);
    }
  }

  calculateBreak = async (id, breakStopTime) => {
    try {
      let editedGuest = await this.editGuest(
        id, 
        { 
          break_stop_time: breakStopTime 
        }
      )

      let breakMinutes = calculateMinutes(
        convertTimeStringToObject(editedGuest.break_start_time),
        convertTimeStringToObject(editedGuest.break_stop_time),
      )

      console.log('********************************** services');
      console.log(breakMinutes);

      editedGuest = await this.editGuest(
        id, 
        { 
          break_minutes: +editedGuest.break_minutes + +breakMinutes, 
        }
      )

      let breakGuest = await this.editGuest(
        id, 
        { 
          break_start_time: null, 
          break_stop_time: null, 
          is_break: false,
        }
      )

      return breakGuest;
    } catch (error) {
      throw new Error(error);
    }
  }

  getGuestsByShiftsId = async (shiftsId) => {
    try {
      const guestsByShiftsId = await Guest.findAll({
        raw: true,
        where: {
          shifts_id: shiftsId,
        }
      });
      
      return guestsByShiftsId;
    } catch (error) {
      throw new Error(error);
    }
  }

  // deleteUser = async (id) => {
  //   try {
  //     const countDeletedUsers = await User.destroy({
  //       where: {
  //         users_id: id
  //       }
  //     });

  //     if (!countDeletedUsers) {
  //       return {
  //         error: `Пользователь с id = ${id} не найден!`
  //       }
  //     }
      
  //     let message = `Пользователь с id = ${id} успешно удален!`;
  //     return {
  //       message,
  //       id
  //     };
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}

export default new GuestsServices();