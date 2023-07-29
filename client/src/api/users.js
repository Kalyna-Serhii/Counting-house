import fetchInstance from './fetchInstance';
import ApiError from './ApiError';

const users = {
  async get() {
    try {
      return await fetchInstance.get('/users');
    } catch (error) {
      throw new Error('Не удалось получить пользователей');
    }
  },
  async post(body) {
    try {
      return await fetchInstance.post('/user', body);
    } catch (error) {
      const emptyMessage = await error.json();
      const nameInvalid = emptyMessage.error;
      const errorMessage = {
        status: error.status,
        message: nameInvalid || emptyMessage,
      };
      throw new ApiError(errorMessage);
    }
  },
  async patch(userId, body) {
    try {
      return await fetchInstance.patch(`/user/${userId}`, body);
    } catch (error) {
      const emptyMessage = await error.json();
      const nameInvalid = emptyMessage.error;
      const errorMessage = {
        status: error.status,
        message: nameInvalid || emptyMessage,
      };
      throw new ApiError(errorMessage);
    }
  },
  async delete(userId) {
    try {
      return await fetchInstance.delete(`/user/${userId}`);
    } catch (error) {
      throw new Error('Не удалось удалить пользователя');
    }
  },
};

export default users;
