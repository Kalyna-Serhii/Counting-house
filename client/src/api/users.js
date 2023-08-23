import fetchInstance from './fetchInstance';
import ApiError from './ApiError';
import getErrorMessage from './error-message';

const users = {
  async getUsers() {
    try {
      const response = await fetchInstance.get('/users');
      return response;
    } catch (error) {
      throw new Error('Не удалось получить пользователей');
    }
  },
  async post(body) {
    try {
      const response = await fetchInstance.post('/user', body);
      return response;
    } catch (error) {
      const errorMessage = await getErrorMessage(error);
      throw new ApiError(errorMessage);
    }
  },
  async updateUser(userId, body) {
    try {
      const response = await fetchInstance.patch(`/user/${userId}`, body);
      return response;
    } catch (error) {
      const errorMessage = await getErrorMessage(error);
      throw new ApiError(errorMessage);
    }
  },
  async deleteUser(userId) {
    try {
      await fetchInstance.delete(`/user/${userId}`);
    } catch (error) {
      throw new Error('Не удалось удалить пользователя');
    }
  },
};

export default users;
