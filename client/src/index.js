import './style.css';
import { api } from "./api";

document.addEventListener('DOMContentLoaded', async function () {
  const tbody = document.querySelector('tbody');
  const usersListElement = document.querySelector('#users');
  const template = document.querySelector('#userRow');

  if (usersListElement) {
    const users = await api.users.get();

    const createUserItemElement = () => {
      let UserRow = 0;
      for (const user of users) {
        if ('content' in document.createElement('template')) {
          const clone = template.content.cloneNode(true);
          const trElements = clone.querySelectorAll('tr');
          const td = clone.querySelectorAll('td');
          const userValues = Object.values(user);

          for (const tr of trElements) {
            tr.id = user.id
          }
          /**
           * Удалить
           */
          for (let i = 0; i < td.length; i++) {
            const input = document.createElement('input');

            if (i < td.length - 3) {
              input.setAttribute('type', 'text');
              input.setAttribute('readonly', '');
              input.value = i >= 5 ? userValues[i + 1] : userValues[i];
              input.className = UserRow;
              td[i].appendChild(input);
            }

            /**
             * Создаем кнопку редактировать
             */
            if (i === 10) {
              const editButton = document.createElement('button');
              editButton.textContent = 'Редактировать';
              editButton.className = 'btn btn-light';
              td[i].appendChild(editButton);

              let inputs = document.getElementsByClassName(UserRow);
              let isEditing = false; // Флаг для отслеживания состояния редактирования

              editButton.addEventListener('click', function (event) {
                event.preventDefault();

                if (isEditing) {
                  for (let elem = 0; elem < inputs.length; elem++) {
                    inputs[elem].readOnly = true;
                  }
                  editButton.textContent = 'Редактировать';
                } else {
                  for (let elem = 0; elem < inputs.length; elem++) {
                    inputs[elem].readOnly = false;
                  }
                  editButton.textContent = 'Готово';
                }
                isEditing = !isEditing;
              });
            }
            /**
             * Создаем кнопку удалить
             */
            if (i === 11) {
              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'Удалить';
              deleteButton.className = 'btn btn-danger'
              td[i].appendChild(deleteButton);
              deleteButton.addEventListener('click', async function (event) {
                event.preventDefault();
                const fieldIdUser = document.getElementById(user.id)
                try {
                  await api.users.delete(user.id);
                  fieldIdUser.remove();
                } catch (error) {
                  throw new Error('Не получилось удалить пользователя');
                }
              });
            }
          }
          tbody.appendChild(clone);
        }
        UserRow++;
      }
    };
    createUserItemElement();
  }
});
