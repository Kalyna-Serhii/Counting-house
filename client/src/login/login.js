import api from '../api';
import showError from '../users-action/showError';
import getFormBody from '../users-action/getFormBody';

const buttonLoginHandler = () => {
  const loginFormId = document.querySelector('#login');
  if (loginFormId) {
    const submitLogin = document.querySelector('#submitLogin');
    submitLogin.addEventListener('click', async (event) => {
      event.preventDefault();
      const formButtonLogin = event.target;
      const parentForm = formButtonLogin.closest('form');
      try {
        const formBody = getFormBody(parentForm);
        const response = await api.auth.login(formBody);
        const { accessToken, refreshToken } = response;
        document.cookie = `accessToken=${accessToken}; path=/;`;
        document.cookie = `refreshToken=${refreshToken}; path=/;`;
        window.location.href = '../index.html';
      } catch (error) {
        showError(error, parentForm);
      }
    });
  }
};

export default buttonLoginHandler;
