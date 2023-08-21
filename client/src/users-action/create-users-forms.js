import ButtonEdit from './button-edit';
import api from '../api';

const createUsersForms = async () => {
  const table = document.querySelector('.table');
  const usersListElement = document.querySelector('#users');
  const template = document.querySelector('#userRow');

  if (usersListElement) {
    ButtonEdit();
    const users = await api.users.get();
    const sortUsersByRoom = (user) => user.sort((a, b) => a.room - b.room);

    const createUserItemElement = () => {
      const sortedUsers = sortUsersByRoom(users);
      for (const user of sortedUsers) {
        if ('content' in document.createElement('template')) {
          const clone = template.content.cloneNode(true);
          const forms = clone.querySelectorAll('.form-user');
          for (const form of forms) {
            form.id = user.id;
            for (const input of form) {
              if (input.type !== 'file' && input.type !== 'button' && input.type !== 'select-one') {
                input.readOnly = true;
                input.value = user[input.name];
              } else if (input.type === 'select-one') {
                input.disabled = true;
                input.value = user[input.name];
              }
            }
          }
          table.appendChild(clone);
        }
      }
    };
    createUserItemElement();
  }
};

export default createUsersForms;
