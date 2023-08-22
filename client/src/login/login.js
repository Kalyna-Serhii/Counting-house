import api from '../api';

const handleFormLogin = async () => {
  const loginFormId = document.querySelector('#login');
  if (loginFormId) {
    const submitLogin = document.querySelector('#submitLogin');
    submitLogin.addEventListener('click', async (event) => {
      event.preventDefault();
      const email = document.querySelector('#emailOrPhone');
      const password = document.querySelector('#exampleInputPassword1');
      const response = await api.auth.login({
        phoneOrEmail: email.value,
        password: password.value,
      });
      const { accessToken, refreshToken } = response;
      document.cookie = `accessToken=${accessToken}; path=/;`;
      document.cookie = `refreshToken=${refreshToken}; path=/;`;
    });
  }
};

export default handleFormLogin;
