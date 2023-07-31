import fetchInstance from './fetchInstance';
import ApiError from './ApiError';

const administration = {
  async post(body) {
    try {
      return await fetchInstance.post('/administration/user', body);
    } catch (error) {
      const emptyMessage = await error.json();
      const nameInvalid = emptyMessage.error;
      const errorMessage = {
        status: error.status,
        message: nameInvalid || emptyMessage,
      };
      console.log('nameInvalid', nameInvalid);
      console.log('emptyMessage', emptyMessage);
      console.log('errorMessage', errorMessage);
      throw new ApiError(errorMessage);
    }
  },
  async patch(userId, body) {
    try {
      return await fetchInstance.patch(`/administration/user/${userId}`, body);
    } catch (error) {
      const emptyMessage = await error.json();
      const nameInvalid = emptyMessage.error;
      const errorMessage = {
        status: error.status,
        message: nameInvalid || emptyMessage,
      };
      console.log('nameInvalid', nameInvalid);
      console.log('emptyMessage', emptyMessage);
      console.log('errorMessage', errorMessage);
      console.log(errorMessage.message);
      throw new ApiError(errorMessage);
    }
  },
};

export default administration;