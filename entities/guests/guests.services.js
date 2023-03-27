import { Guest } from './guests.model.js';
// import { DayResults } from '../dayResults/dayResults.model.js';
import { convertTimeStringToObject, calculateMinutes, convertMinutesToMoney } from '../../utils/utils.js';

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
        isHoliday: false,
        tariffsId: '1',
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