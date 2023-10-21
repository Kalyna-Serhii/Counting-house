import './style.css';
import createUsersForms from './usersAction/create-users-forms';

document.addEventListener('DOMContentLoaded', async () => {
  await createUsersForms();
  await import('./components/auth/registration');
});
