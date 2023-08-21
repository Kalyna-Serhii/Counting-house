import api from '../api';

const handleFormLogin = async () => {
  const loginFormId = document.querySelector('#login');
  if (loginFormId) {
    const submitLogin = document.querySelector('#submitLogin');
    submitLogin.addEventListener('click', (event) => {
      event.preventDefault();
      const email = document.querySelector('#emailOrPhone');
      const password = document.querySelector('#exampleInputPassword1');

      const response = api.auth.login({
        phoneOrEmail: email.value,
        password: password.value,
      });

      console.log('response', response);
    });
  }
};

export default handleFormLogin;
