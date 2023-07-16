import './style.css';

const URL = 'http://127.0.0.1:3000/api';

async function getUsers() {
  try {
    const response = await fetch(`${URL}/users`);
    return await response.json();
  } catch (error) {
    console.dir(error);
    throw new Error('wtf');
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  const tbody = document.querySelector('tbody');
  const usersListElement = document.querySelector('#users');
  const template = document.querySelector('#userRow');

  if (usersListElement) {
    const users = await getUsers();

    const createUserItemElement = () => {
      for (const user of users) {
        if ('content' in document.createElement('template')) {
          const clone = template.content.cloneNode(true);
          const tr = clone.querySelectorAll('tr');
          const td = clone.querySelectorAll('td');
          const userValues = Object.values(user);

          // TODO
          console.log('tr', ...tr)

          /**
           * Удалить
           */
          for (let i = 0; i < td.length; i++) {
            const input = document.createElement('input');

            if (i < td.length - 3) {
              input.setAttribute('type', 'text');
              input.setAttribute('readonly', '');
              input.value = i >= 5 ? userValues[i + 1] : userValues[i];
              td[i].appendChild(input);
            }

            /**
             * Создаем кнопку редактировать
             */
            if (i === 10) {
              const editButton = document.createElement('button');
              editButton.textContent = 'Редактировать';
              td[i].appendChild(editButton);
            }
            /**
             * Создаем кнопку удалить
             */
            if (i === 11) {
              const editButton = document.createElement('button');
              editButton.textContent = 'Удалить';
              td[i].appendChild(editButton);
            }


            /*const editButton = document.createElement('button');
            editButton.textContent = 'Редактировать';
            td[i].appendChild(editButton);

            editButton.addEventListener('click', function () {
              input.removeAttribute('readonly');
              input.focus();
            });*/
          }
          tbody.appendChild(clone);
        }
      }
    };
    createUserItemElement();
  }
});
