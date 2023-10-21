import fetchInstance from './fetchInstance';
import ApiError from './ApiError';

const auth = {
  async registration(data) {
    console.log('data', data);
    try {
      return await fetchInstance.post('/auth/registration', data);
    } catch (error) {
      const { message } = await error.json();
      console.dir(message);
      throw new Error('Не удалось получить пользователей');
    }
  },
  async login(data) {
    try {
      return await fetchInstance.post('/auth/login', data);
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
};

export default auth;
