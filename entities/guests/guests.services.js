import { Guest } from './guests.model.js';
import { convertTimeStringToObject, calculateMinutes } from '../../utils/utils.js';

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
      
      const editedGuest = await Guest.findOne({
        where: { id }
      })

      return editedGuest;
    } catch (error) {
      throw new Error(error);
    }
  }

  calculateMoney = async (id, stopTime) => {
    try {
      await Guest.update(
        {
          stop_time: stopTime
        },

        {
          where: { id }
        }
      )
      
      let calculatedGuest = await Guest.findOne({
        where: { id }
      })
      calculatedGuest = calculatedGuest.dataValues;

      let minutes = calculateMinutes(
        convertTimeStringToObject(calculatedGuest.start_time),
        convertTimeStringToObject(calculatedGuest.stop_time),
      )

      await Guest.update(
        {
          minutes,
        },

        {
          where: { id }
        }
      )

      calculatedGuest = await Guest.findOne({
        where: { id }
      })

      return calculatedGuest;
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