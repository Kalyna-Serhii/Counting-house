import fetchInstance from './fetchInstance';

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
      return response;
    } catch (error) {
      throw new Error('Не удалось авторизироваться');
    }
  },
};

export default auth;
