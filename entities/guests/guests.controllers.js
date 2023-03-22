import guestsServices from './guests.services.js';

class GuestsControllers {
  getAllGuests = async (req, res) => {
    try {
      const guests = await guestsServices.getAllGuests();
      
      return res.status(200).json({
        guests,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  addGuest = async (req, res) => {
    try {
      const options = req.body;
      const guest = await guestsServices.addGuest(options);
      
      return res.status(200).json({
        guest,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  editGuest = async (req, res) => {
    try {
      const { id } = req.params;
      const options = req.body;

      if (!id) {
        return res.status(400).json({
          error: 'Параметр id не передан',
        })
      }

      const editedGuest = await guestsServices.editGuest(id, options);
      
      return res.status(200).json({
        editedGuest,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  calculateMoney = async (req, res) => {
    try {
      const { id } = req.params;
      const stopTime = req.body;

      if (!id) {
        return res.status(400).json({
          error: 'Параметр id не передан',
        })
      }

      if (!stopTime) {
        return res.status(400).json({
          error: 'Параметр stopTime не передан',
        })
      }

      const calculatedGuest = await guestsServices.calculateMoney(id, stopTime);
      
      return res.status(200).json({
        calculatedGuest,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  // deleteUser = async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     if (!id) {
  //       return res.status(400).json({
  //         error: 'Параметр id не передан',
  //       })
  //     }

  //     const result = await usersServices.deleteUser(id);

  //     if (result.error) {
  //       return res.status(400).json({
  //         error: result.error,
  //       })
  //     }
      
  //     return res.status(200).json({
  //       result,
  //       error: null,
  //     })
  //   } catch (error) {
  //     return res.status(500).json({
  //       error: error.message,
  //     })
  //   }
  // }

  // editUser = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { role } = req.body;

  //     if (!id) {
  //       return res.status(400).json({
  //         error: 'Параметр id не передан',
  //       })
  //     }

  //     const editedUser = await usersServices.editUser({id, role});
      
  //     return res.status(200).json({
  //       editedUser,
  //       error: null,
  //     })
  //   } catch (error) {
  //     return res.status(500).json({
  //       error: error.message,
  //     })
  //   }
  // }
}

export default new GuestsControllers();