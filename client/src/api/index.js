import fetchInstance from './fetchInstance';
import users from './users';
import admin from './admin';
import ApiError from './ApiError';
import auth from './auth';

const api = {
  fetchInstance,
  users,
  admin,
  auth,
  ApiError,
};

export default api;
