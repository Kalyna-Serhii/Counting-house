import api from '../api';
import showError from '../showError';
import getFormBody from '../getFormBody';

const handleFormCreate = async (event) => {
  const formButtonCreate = event.target;
  const parentForm = formButtonCreate.closest('form');
  try {
    const formBody = getFormBody(parentForm);
    const createFormElements = Array.from(parentForm.elements);
    console.log(formBody);
    const newCostItem = await api.costs.createCostItem(formBody);
    const formId = newCostItem.id;
    const newTableDiv = document.createElement('div');
    newTableDiv.classList.add('table');
    const newForm = document.createElement('form');
    newForm.classList.add('form-new-cost-item');
    newForm.id = formId;
    const newRowDiv = document.createElement('div');
    newRowDiv.classList.add('row', 'py-3', 'border', 'mb-3');
    newRowDiv.id = 'newCostItem';
    const template = document.querySelector('#costItemRow');
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
        await api.costs.updateCostItem(formId, formBody);
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
  const costItemId = parentForm.id;
  try {
    await api.costs.deleteCostItem(costItemId);
    parentForm.remove();
  } catch (error) {
    showError(error, parentForm);
  }
};

const buttonEditHandler = () => {
  document.addEventListener('click', async (event) => {
    const targetId = event.target.id;
    if (targetId === 'button-create-cost-item') {
      await handleFormCreate(event);
    } else if (targetId === 'button-edit-cost-item') {
      await handleFormEdit(event);
    } else if (targetId === 'button-delete-cost-item') {
      await handleFormDelete(event);
    }
  });
};

export default buttonEditHandler;
