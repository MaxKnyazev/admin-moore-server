import TariffsServices from './tariffs.services.js';

class TariffsControllers {
  getAllTariffs = async (req, res) => {
    try {
      const tariffs = await TariffsServices.getAllTariffs();
      
      return res.status(200).json({
        tariffs,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  addTariff = async (req, res) => {
    try {
      const options = req.body;
      const tariff = await TariffsServices.addTariff(options);
      
      return res.status(200).json({
        tariff,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  editTariff = async (req, res) => {
    try {
      const { id } = req.params;
      const options = req.body;

      if (!id) {
        return res.status(400).json({
          error: 'Параметр id не передан',
        })
      }

      const editedTariff = await TariffsServices.editTariff(id, options);
      
      return res.status(200).json({
        editedTariff,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}

export default new TariffsControllers();