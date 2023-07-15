import './style.css';

async function getUsers() {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/users');
    console.log('response', await response);
    return await response.json();
  } catch (error) {
    console.dir(error);
    throw new Error('wtf');
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  const usersListElement = document.querySelector('#users');
  if (usersListElement) {
    const users = await getUsers();
    const createUserItemElement = () => {
      users.forEach((user) => {
        const tr = document.createElement('tr');

        const id = document.createElement('td');
        id.textContent = user.id;
        tr.appendChild(id);

        const name = document.createElement('td');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = user.name; // Исправление здесь
        name.appendChild(nameSpan);
        tr.appendChild(name);

        const surname = document.createElement('td');
        surname.textContent = user.surname;
        tr.appendChild(surname);

        const gender = document.createElement('td');
        gender.textContent = user.gender;
        tr.appendChild(gender);

        const phone = document.createElement('td');
        phone.textContent = user.phone;
        tr.appendChild(phone);

        const email = document.createElement('td');
        email.textContent = user.email;
        tr.appendChild(email);

        const floor = document.createElement('td');
        floor.textContent = user.floor;
        tr.appendChild(floor);

        const room = document.createElement('td');
        room.textContent = user.room;
        tr.appendChild(room);

        const role = document.createElement('td');
        role.textContent = user.role;
        tr.appendChild(role);

        const avatar = document.createElement('td');
        avatar.textContent = user.avatar;
        tr.appendChild(avatar);

        const editButton = document.createElement('td');
        const editButtonInput = document.createElement('button');
        editButtonInput.textContent = 'Редактировать';
        editButton.appendChild(editButtonInput);
        tr.appendChild(editButton);

        editButtonInput.addEventListener('click', function () {
          const nameInput = document.createElement('input');
          const nameSpan = name.querySelector('span');
          if (nameSpan && nameSpan.parentNode.contains(nameSpan)) {
            nameInput.value = nameSpan.textContent;
            name.removeChild(nameSpan);
            name.appendChild(nameInput);
            editButtonInput.textContent = 'Готово';
            const editedName = nameInput.value;
            fetch('http://127.0.0.1:3000/api/user/' + user.id, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: user.id,
                name: editedName,
                surname: 'Doe',
                gender: 'man',
                phone: '+380987554320',
                password: '12345678f',
                repeatPassword: '12345678f',
                email: 'jojo@example.com',
                floor: 1,
                room: 1,
                role: 'user',
                avatar: '',
              }),
            })
              .then((response) => {
                if (response.ok) {
                  createUserItemElement();
                } else {
                  console.log('Lil Peep');
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            if (nameInput.parentNode) {
              nameInput.parentNode.removeChild(nameInput);
            }
            const newNameSpan = document.createElement('span');
            newNameSpan.textContent = nameInput.value;
            name.textContent = '';
            name.appendChild(newNameSpan);
            editButtonInput.textContent = 'Редактировать';
            usersListElement.appendChild(tr);
          }
        });
        usersListElement.appendChild(tr);
      });
    };
    createUserItemElement();
  }
});
