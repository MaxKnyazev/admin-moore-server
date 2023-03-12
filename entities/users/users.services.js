import { User } from './users.model.js';

class UsersServices {
  getAllUsers = async () => {
    try {
      const users = await User.findAll({
        raw: true,
      });
      
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  deleteUser = async (id) => {
    try {
      const countDeletedUsers = await User.destroy({
        where: {
          id
        }
      });

      if (!countDeletedUsers) {
        return {
          error: `Пользователь с id = ${id} не найден!`
        }
      }
      
      let message = `Пользователь с id = ${id} успешно удален!`;
      return {
        message,
        id
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  editUser = async ({id, status}) => {
    try {
      await User.update(
        {
          status,
        },

        {
          where: {
            id
          }
        }
      )
      
      const editedUser = await User.findOne({
        where: {
          id
        }}
      )

      return editedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new UsersServices();