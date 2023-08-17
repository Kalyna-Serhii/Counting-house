function showError(error, parentForm) {
  const createErrorElement = document.createElement('p');
  createErrorElement.className = 'alert alert-danger form-error-message';
  createErrorElement.textContent = error.payload.message.message || error.payload.message || error;
  parentForm.appendChild(createErrorElement);
  setTimeout(() => {
    parentForm.querySelector('.form-error-message').remove();
  }, 5000);
}

export default showError;
