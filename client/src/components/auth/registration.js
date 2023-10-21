import api from '../../api';

const registration = async (event) => {
  event.preventDefault();
  const formInputs = document.querySelectorAll('#registrationForm input');
  const profile = {};
  formInputs.forEach((element) => {
    if (element.id === 'phone') {
      profile.username = element.value;
    }
    if (element.id === 'password') {
      profile.password = element.value;
    }
  });
  console.log('gulay', profile);
  if (!profile.username && !profile.password) return;
  console.log('registration', profile);
  try {
    await api.auth.registration(profile);
    window.location.href = '/login';
  } catch (error) {
    console.log('error', error);
  }
};

const registrationButton = document.querySelector('#registrationBtn');
registrationButton.addEventListener('click', registration);

// registration();
