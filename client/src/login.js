import getFormBody from './usersAction/getFormBody';

const handleFormLogin = async (event) => {
  const formButtonCreate = event.target;
  console.log('formButtonCreate', formButtonCreate);
  const parentForm = formButtonCreate.closest('form');
  console.log('parentForm', parentForm);
  const formBody = getFormBody(parentForm);
  console.log('formBody', formBody);
  // const user = await api.users.post(formBody);
};

document.addEventListener('click', async (event) => {
  event.preventDefault();
  const isFormButtonLogin = event.target.classList.contains('btn-primary');
  if (isFormButtonLogin) {
    await handleFormLogin(event);
  }
});
