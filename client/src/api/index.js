import fetchInstance from './fetchInstance';
import users from './users';
import admin from './admin';
import ApiError from './api-error';
import auth from './auth';

const api = {
  fetchInstance,
  users,
  admin,
  auth,
  ApiError,
};

export default api;
