import dayResultsServices from './dayResults.services.js';

class DayResultsControllers {
  getAllDayResults = async (req, res) => {
    try {
      const dayResults = await dayResultsServices.getAllDayResults();
      
      return res.status(200).json({
        dayResults,
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

export default new DayResultsControllers();