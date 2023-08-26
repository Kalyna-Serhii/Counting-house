import './style.css';
import createUsersForms from './usersAction/create-users-forms';
import createCostsForm from './costsActions/create-costs-form';

document.addEventListener('DOMContentLoaded', async () => {
  await createUsersForms();
  await createCostsForm();
});
