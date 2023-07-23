import api from '../api';

const buttonEditHandler = () => {
  const formData = {};

  document.addEventListener('click', async (event) => {
    event.preventDefault();
    const isFormButtonEdit = event.target.classList.contains('form__button-edit');
    if (!isFormButtonEdit) return;
    const formButtonEdit = event.target;
    const parentForm = formButtonEdit.closest('form');
    const formId = parentForm.id;
    const formElements = Array.from(parentForm.elements);

    formElements.forEach((element) => {
      if (element.name) {
        formData[element.name] = element.value;
      }
    });

    if (formButtonEdit.textContent === 'Готово') {
      formButtonEdit.textContent = 'Редактировать';
      formButtonEdit.classList.remove('btn-success')
      formButtonEdit.classList.add('btn-primary')
      const inputs = parentForm.querySelectorAll('input');
      for(const input of inputs) {
        input.readOnly = true;
      }
      try {
        formData.id = formId;
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
      formButtonEdit.classList.remove('btn-primary')
      formButtonEdit.classList.add('btn-success')
      const inputs = parentForm.querySelectorAll('input');
      for(const input of inputs) {
        input.readOnly = false;
      }
    }
  });
};

export default buttonEditHandler;
