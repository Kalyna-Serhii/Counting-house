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

        const name = document.createElement('td');
        name.textContent = user.name;
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

        usersListElement.appendChild(tr);
      });
    };
    createUserItemElement();
    console.log(users);
  }
});
