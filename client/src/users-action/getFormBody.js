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

export default getFormBody;
