import CostModel from '../models/cost-model';
import ApiError from '../exceptions/api-error';

const CostService = {
  async getCostItems() {
    const costItems = await CostModel.findAll();
    return costItems;
  },

  async createCostItem(body) {
    const {
      category, title, comment, date, sum,
    } = body;
    const newCostItem = await CostModel.create({
      title,
      comment,
      date,
      sum,
      category,
    });
    return newCostItem;
  },

  async updateCostItem(params, body) {
    const { id } = params;
    const costItem = await CostModel.findOne({ where: { id } });
    if (!costItem) {
      throw ApiError.BadRequest('Такого пункту не існує');
    }
    const {
      category, title, comment, date, sum,
    } = body;
    const updatedFields = {};
    updatedFields.title = title;
    updatedFields.comment = comment;
    updatedFields.date = date;
    updatedFields.sum = sum;
    updatedFields.category = category;
    const updatedCostItem = await costItem.update(updatedFields);
    return updatedCostItem;
  },

  async deleteCostItem(param) {
    const { id } = param;
    const costItem = await CostModel.findOne({ where: { id } });
    if (!costItem) {
      throw ApiError.BadRequest('Такого пункту не існує');
    }
    await costItem.destroy();
  },
};

export default CostService;
