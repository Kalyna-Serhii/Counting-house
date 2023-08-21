import './style.css';
import createUsersForms from './users-action/create-users-forms';
import login from './login';

document.addEventListener('DOMContentLoaded', async () => {
  await createUsersForms();
  await login();
});
