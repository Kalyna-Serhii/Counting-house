import api from '../api';

const buttonEditHandler = () => {
  const formData = {};

  document.addEventListener('click', async (event) => {
    event.preventDefault();

    // Обработчик кнопки Створити
    const formButtonCreate = event.target;
    const parentForm = formButtonCreate.closest('form');
    try {
      const isFormButtonCreate = event.target.classList.contains('form__button-create');
      if (isFormButtonCreate) {
        const createFormElements = Array.from(parentForm.elements);
        createFormElements.forEach((element) => {
          if (element.name) {
            formData[element.name] = element.value;
          }
        });
        const newUser = await api.users.post(formData);
        const formId = newUser.id;
        const newTableDiv = document.createElement('div');
        newTableDiv.classList.add('table');
        const newForm = document.createElement('form');
        newForm.classList.add('form-new-user');
        newForm.id = formId;
        const newRowDiv = document.createElement('div');
        newRowDiv.classList.add('row', 'py-3', 'border', 'mb-3');
        newRowDiv.id = 'newUser';
        const template = document.querySelector('#userRow');
        const { content } = template;
        const colAutoElements = content.querySelectorAll('.col-auto');
        colAutoElements.forEach((colAutoElement) => {
          const clonedElement = colAutoElement.cloneNode(true);
          const inputElement = clonedElement.querySelector('input, select');
          if (inputElement) {
            const originalElement = parentForm.querySelector(`[name="${inputElement.name}"]`);
            inputElement.value = originalElement.value;
            if (inputElement.type !== 'file' && inputElement.type !== 'button' && inputElement.type !== 'select-one') {
              inputElement.readOnly = true;
            } else if (inputElement.type === 'select-one') {
              inputElement.disabled = true;
            }
          }
          newRowDiv.appendChild(clonedElement);
        });

        const buttonsContainerDiv = document.createElement('div');
        buttonsContainerDiv.classList.add(
          'col-sm-12',
          'col-md-6',
          'col-lg-8',
          'ms-lg-auto',
          'row',
          'align-items-md-end',
        );

        createFormElements.forEach((element) => {
          if (element.type !== 'file' && element.type !== 'button' && element.type !== 'select-one') {
            element.value = '';
          }
        });

        const buttonsContainer = content.querySelector(
          '.col-sm-12.col-md-6.col-lg-8.ms-lg-auto.row.align-items-md-end',
        );
        const clonedButtonsContainer = buttonsContainer.cloneNode(true);
        newRowDiv.appendChild(clonedButtonsContainer);

        newRowDiv.appendChild(buttonsContainerDiv);
        newForm.appendChild(newRowDiv);
        newTableDiv.appendChild(newForm);
        parentForm.insertAdjacentElement('afterend', newForm);
      }
    } catch (error) {
      const createErrorElement = document.createElement('p');
      createErrorElement.className = 'alert alert-danger form-error-message';
      createErrorElement.textContent = await error.payload?.message;
      parentForm.prepend(createErrorElement);
      setTimeout(() => {
        parentForm.querySelector('.form-error-message').remove();
      }, 5000);
    }

    // Обработчик кнопки Редагувати
    event.preventDefault();
    const isFormButtonEdit = event.target.classList.contains('form__button-edit');
    if (isFormButtonEdit) {
      const formButtonEdit = event.target;
      const formId = formButtonEdit.closest('form').id;
      const editFormElements = Array.from(formButtonEdit.closest('form').elements);

      editFormElements.forEach((element) => {
        if (element.name) {
          formData[element.name] = element.value;
        }
      });
      if (formButtonEdit.textContent === 'Готово') {
        try {
          formData.id = formId;
          await api.users.patch(formId, formData);
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
    // Обработчик кнопки Редагувати
    const isFormButtonDelete = event.target.classList.contains('table__button-remove');
    if (isFormButtonDelete) {
      try {
        const formButtonDelete = event.target;
        const parent = formButtonDelete.parentNode.parentNode.parentNode.parentNode;
        const userId = parent.id;
        await api.users.delete(userId);
        parent.remove();
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
  });
};

export default buttonEditHandler;
