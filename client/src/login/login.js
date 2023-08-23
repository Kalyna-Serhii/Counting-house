import api from '../api';
import showError from '../users-action/showError';

const buttonLoginHandler = () => {
  const loginFormId = document.querySelector('#login');
  if (loginFormId) {
    const submitLogin = document.querySelector('#submitLogin');
    submitLogin.addEventListener('click', async (event) => {
      event.preventDefault();
      const formButtonLogin = event.target;
      const parentForm = formButtonLogin.closest('form');
      try {
        const email = document.querySelector('#emailOrPhone');
        const password = document.querySelector('#password');
        const response = await api.auth.login({
          phoneOrEmail: email.value,
          password: password.value,
        });
        const { accessToken, refreshToken } = response;
        document.cookie = `accessToken=${accessToken}; path=/;`;
        document.cookie = `refreshToken=${refreshToken}; path=/;`;
        console.log('запрос успешный');
      } catch (error) {
        showError(error, parentForm);
      }
    });
  }
};

export default buttonLoginHandler;
