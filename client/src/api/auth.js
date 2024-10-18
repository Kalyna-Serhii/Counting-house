import fetchInstance from './fetchInstance';
import ApiError from './api-error';
import getErrorMessage from './error-message';

const auth = {
  /** Асинхронно выполняет процесс авторизации пользователя.
   *
   * @param {Object} body - Параметры для авторизации.
   * @param {string} body.phoneOrEmail - Телефон или электронная почта
   * пользователя.
   * @param {string} body.password - Пароль пользователя.
   * @returns {Promise<Response>} - Промис, который разрешается в объект
   * Response при успешной авторизации.
   * @throws {Error} - В случае ошибки при выполнении авторизации выбрасывается
   * исключение с сообщением "Не удалось авторизироваться".
   */
  async login(body) {
    try {
      const response = await fetchInstance.post('/login', body);
      console.log('auth', response);
      if (!response.ok) {
        throw new ApiError({
          ...await response.json(),
          status: response.status
        })
      }
      return response;
    } catch (error) {
      throw error;
      // const errorMessage = await getErrorMessage(error);
      // throw new ApiError(errorMessage);
    }
  },
};

export default auth;
