import './style.css';

async function getUsers() {
  const response = await fetch('http://127.0.0.1:3000/api/users');
  console.log('response', await response);
  return await response.json();
}

document.addEventListener('DOMContentLoaded', async function () {
  const usersList = document.querySelector('#users');
  const users = await getUsers();
  const createUserItem = () => {
    users.forEach((user) => {
      const li = document.createElement('li');
      li.textContent = `name: ${user.name}`;
      usersList.appendChild(li);
    });
  };
  createUserItem();
  console.log(users);
});
