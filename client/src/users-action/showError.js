/**
 *
 * @param errorMessage - текст ошибки
 * @param parentForm - наверное форма TODO нужно узнать узнать
 */
function showError(errorMessage, parentForm) {
  const createErrorElement = document.createElement('p');
  createErrorElement.className = 'alert alert-danger form-error-message';
  createErrorElement.textContent = errorMessage;
  parentForm.appendChild(createErrorElement);
}

export default showError;
