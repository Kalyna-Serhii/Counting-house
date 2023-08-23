import fetchInstance from './fetchInstance';
import ApiError from './ApiError';
import getErrorMessage from './error-message';

const admin = {
  async createFakeUser(body) {
    try {
      return await fetchInstance.post('/admin/user', body);
    } catch (error) {
      const errorMessage = await getErrorMessage(error);
      throw new ApiError(errorMessage);
    }
  },
  async updateFakeUser(userId, body) {
    try {
      return await fetchInstance.patch(`/admin/user/${userId}`, body);
    } catch (error) {
      const errorMessage = await getErrorMessage(error);
      throw new ApiError(errorMessage);
    }
  },
};

export default admin;
