import api from '../api';
import showError from './showError';

const getFormBody = (form) => {
  const formBody = {};
  const formElements = Array.from(form.elements);
  formElements.forEach((element) => {
    if (element.name) {
      formBody[element.name] = element.value;
    }
  });
  return formBody;
};

const handleFormCreate = async (event) => {
  const formButtonCreate = event.target;
  const parentForm = formButtonCreate.closest('form');
  try {
    const formBody = getFormBody(parentForm);
    const createFormElements = Array.from(parentForm.elements);
    const newUser = await api.admin.post(formBody);
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
    buttonsContainerDiv.classList.add('col-sm-12', 'col-md-6', 'col-lg-8', 'ms-lg-auto', 'row', 'align-items-md-end');

    createFormElements.forEach((element) => {
      if (element.type !== 'file' && element.type !== 'button' && element.type !== 'select-one') {
        parentForm.reset();
      }
    });

    const buttonsContainer = content.querySelector('.col-sm-12.col-md-6.col-lg-8.ms-lg-auto.row.align-items-md-end');
    const clonedButtonsContainer = buttonsContainer.cloneNode(true);
    newRowDiv.appendChild(clonedButtonsContainer);

    newRowDiv.appendChild(buttonsContainerDiv);
    newForm.appendChild(newRowDiv);
    newTableDiv.appendChild(newForm);
    parentForm.insertAdjacentElement('afterend', newForm);
  } catch (error) {
    showError(error, parentForm);
  }
};

const handleFormEdit = async (event) => {
  const formButtonEdit = event.target;
  const parentForm = formButtonEdit.closest('form');
  const formId = parentForm.id;
  try {
    if (formButtonEdit.classList.contains('form__button-edit')) {
      const formBody = getFormBody(parentForm);
      if (formButtonEdit.textContent === 'Готово') {
        await api.admin.patch(formId, formBody);
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
  } catch (error) {
    showError(error, parentForm);
  }
};

const handleFormDelete = async (event) => {
  const formButtonDelete = event.target;
  const parentForm = formButtonDelete.closest('form');
  const userId = parentForm.id;
  try {
    await api.users.delete(userId);
    parentForm.remove();
  } catch (error) {
    showError(error, parentForm);
  }
};

const buttonEditHandler = () => {
  document.addEventListener('click', async (event) => {
    event.preventDefault();

    const isFormButtonCreate = event.target.classList.contains('form__button-create');
    if (isFormButtonCreate) {
      await handleFormCreate(event);
    }
    const isFormButtonEdit = event.target.classList.contains('form__button-edit');
    if (isFormButtonEdit) {
      await handleFormEdit(event);
    }
    const isFormButtonDelete = event.target.classList.contains('form__button-delete');
    if (isFormButtonDelete) {
      await handleFormDelete(event);
    }
  });
};

export default buttonEditHandler;
