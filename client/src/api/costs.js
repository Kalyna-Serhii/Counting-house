import fetchInstance from './fetchInstance';
import ApiError from './ApiError';
import getErrorMessage from './error-message';

const costs = {
  async getCostItems() {
    try {
      const response = await fetchInstance.get('/costs');
      return response;
    } catch (error) {
      const errorMessage = await getErrorMessage(error);
      throw new ApiError(errorMessage);
    }
  },

  async createCostItem(body) {
    try {
      const response = await fetchInstance.post('/cost', body);
      return response;
    } catch (error) {
      const errorMessage = await getErrorMessage(error);
      console.log(errorMessage);
      throw new ApiError(errorMessage);
    }
  },

  async updateCostItem(costId, body) {
    try {
      const response = await fetchInstance.patch(`/cost/${costId}`, body);
      return response;
    } catch (error) {
      const errorMessage = await getErrorMessage(error);
      throw new ApiError(errorMessage);
    }
  },

  async deleteCostItem(costId) {
    try {
      await fetchInstance.delete(`/cost/${costId}`);
    } catch (error) {
      const errorMessage = await getErrorMessage(error);
      throw new ApiError(errorMessage);
    }
  },
};

export default costs;
