import { fetchInstance } from './fetchInstance';

export const users = {
  async get() {
    try {
      return await fetchInstance.get('/users');
    } catch (error) {
      throw new Error('Не удалось получить пользователей');
    }
  },
  async patch(userId, body) {
    try {
      return await fetchInstance.patch(`/user/${userId}`, body);
    } catch (error) {
      throw new Error('Не удалось обновить данные пользователя');
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
