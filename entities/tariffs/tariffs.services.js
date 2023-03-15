import { Tariff } from './tariffs.model.js';

class TariffsServices {
  getAllTariffs = async () => {
    try {
      const tariffs = await Tariff.findAll({
        raw: true,
      });
      
      return tariffs;
    } catch (error) {
      throw new Error(error);
    }
  }

  addTariff = async (options) => {
    try {
      const tariff = await Tariff.create(options);
      
      return tariff;
    } catch (error) {
      throw new Error(error);
    }
  }

  editTariff = async (id, options) => {
    try {
      await Tariff.update(
        options,

        {
          where: {
            id
          }
        }
      )
      
      const editedTariff = await Tariff.findOne({
        where: {
          id
        }}
      )

      return editedTariff;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new TariffsServices();