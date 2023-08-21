const getFormBody = (form) => {
  console.log('tut');
  const formBody = {};
  const formElements = Array.from(form.elements);
  formElements.forEach((element) => {
    if (element.name) {
      formBody[element.name] = element.value;
      console.log(element.value);
    }
  });
  console.log(formBody);
  return formBody;
};

export default getFormBody;
