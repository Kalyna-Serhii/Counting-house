import api from '../api';

const buttonEditHandler = () => {
  const formData = {};

  document.addEventListener('click', async (event) => {
    event.preventDefault();
    // Обработчик кнопки Створити
    const isFormButtonCreate = event.target.classList.contains('form__button-create');
    if (isFormButtonCreate) {
      const formButtonCreate = event.target;
      const parentForm = formButtonCreate.closest('form');
      const createFormElements = Array.from(parentForm.elements);
      createFormElements.forEach((element) => {
        if (element.name) {
          formData[element.name] = element.value;
        }
      });
      console.log('formData', formData);
      try {
        console.log(1);
        await api.users.post(formData);
        console.log(2);
      } catch (error) {
        const createErrorElement = document.createElement('p');
        createErrorElement.className = 'alert alert-danger form-error-message';
        createErrorElement.textContent = await error.payload?.message;
        parentForm.appendChild(createErrorElement);
        setTimeout(() => {
          parentForm.querySelector('.form-error-message').remove();
        }, 5000);
      }
    }
    // Обработчик кнопки Редагувати
    const isFormButtonEdit = event.target.classList.contains('form__button-edit');
    if (isFormButtonEdit) {
      const formButtonEdit = event.target;
      const parentForm = formButtonEdit.closest('form');
      const formId = parentForm.id;
      const editFormElements = Array.from(parentForm.elements);

      editFormElements.forEach((element) => {
        if (element.name) {
          formData[element.name] = element.value;
        }
      });
      if (formButtonEdit.textContent === 'Готово') {
        formButtonEdit.textContent = 'Редагувати';
        formButtonEdit.classList.remove('btn-success');
        formButtonEdit.classList.add('btn-primary');
        const inputs = parentForm.querySelectorAll('input');
        for (const input of inputs) {
          input.readOnly = true;
        }
        const selects = parentForm.querySelectorAll('select');
        for (const select of selects) {
          select.disabled = true;
        }
        try {
          formData.id = formId;
          console.log(formData);
          await api.users.patch(formId, formData);
        } catch (error) {
          const createErrorElement = document.createElement('p');
          createErrorElement.className = 'alert alert-danger form-error-message';
          createErrorElement.textContent = await error.payload?.message;
          parentForm.appendChild(createErrorElement);
          setTimeout(() => {
            parentForm.querySelector('.form-error-message').remove();
          }, 5000);
        }
      } else {
        formButtonEdit.textContent = 'Готово';
        formButtonEdit.classList.remove('btn-primary');
        formButtonEdit.classList.add('btn-success');
        const inputs = parentForm.querySelectorAll('input');
        for (const input of inputs) {
          input.readOnly = false;
        }
        const selects = parentForm.querySelectorAll('select');
        for (const select of selects) {
          select.disabled = false;
        }
      }
    }
    // const isFormButtonCreate = event.target.classList.contains('form__button-create');
  });
};

export default buttonEditHandler;
