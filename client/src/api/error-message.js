async function getErrorMessage(error) {
  const errorJSON = await error.json();
  const errorMessage = errorJSON.message;
  return errorMessage;
}

export default getErrorMessage;
