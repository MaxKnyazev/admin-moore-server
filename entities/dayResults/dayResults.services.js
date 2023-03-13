import { DayResult } from './dayResults.model.js';

class DayResultsServices {
  getAllDayResults = async () => {
    try {
      const dayResults = await DayResult.findAll({
        raw: true,
      });
      
      return dayResults;
    } catch (error) {
      throw new Error(error);
    }
  }

  addDayResult = async (options) => {
    try {
      const dayResult = await DayResult.create(options);
      
      return dayResult;
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

export default new DayResultsServices();