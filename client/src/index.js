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
  const tbody = document.querySelector("tbody");
  const usersListElement = document.querySelector('#users');
  const template = document.querySelector("#userRow");
  if (usersListElement) {
    const users = await getUsers();
    const createUserItemElement = () => {
      users.forEach((user, index) => {
        if ("content" in document.createElement("template")) {
          const clone = template.content.cloneNode(true);
          let td = clone.querySelectorAll("td");
          let tr = clone.querySelectorAll("tr");
          const indexKeys = Object.keys(user);
          for (let i = 0; i < indexKeys.length; i++) {
            console.log('test', Object.keys(user)[i])
            td[index].textContent = 1;
          }
          tbody.appendChild(clone);
        }
      });
    };
    createUserItemElement();


  }
});
