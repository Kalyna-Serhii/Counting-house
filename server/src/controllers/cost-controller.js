import costService from '../service/cost-service';
import CostSchemeValidation from '../validations/schemes/cost-scheme';
import validation from '../validations/validation';

// ошибка будет обработана в Error-middleware
/* eslint-disable consistent-return */

const CostController = {
  async getCostItems(req, res, next) {
    try {
      const costItems = await costService.getCostItems();
      return res.status(200).json(costItems);
    } catch (error) {
      next(error);
    }
  },

  async createCostItem(req, res, next) {
    try {
      validation(req.body, CostSchemeValidation, next);
      const newCostItem = await costService.createCostItem(req.body);
      return res.status(201).json(newCostItem);
    } catch (error) {
      next(error);
    }
  },

  async updateCostItem(req, res, next) {
    try {
      validation(req.body, CostSchemeValidation, next);
      const updatedCostItem = await costService.updateCostItem(req.params, req.body);
      return res.status(200).json(updatedCostItem);
    } catch (error) {
      next(error);
    }
  },

  async deleteCostItem(req, res, next) {
    try {
      await costService.deleteCostItem(req.params);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

export default CostController;
