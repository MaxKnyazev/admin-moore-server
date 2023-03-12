import { Guest } from './guests.model.js';

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

  // editUser = async ({id, role}) => {
  //   try {
  //     await User.update(
  //       {
  //         role,
  //       },

  //       {
  //         where: {
  //           users_id: id
  //         }
  //       }
  //     )
      
  //     const editedUser = await User.findOne({
  //       where: {
  //         users_id: id
  //       }}
  //     )

  //     return editedUser;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}

export default new GuestsServices();