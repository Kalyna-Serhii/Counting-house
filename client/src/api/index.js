import fetchInstance from './fetchInstance';
import users from './users';
import admin from './admin';
import costs from './costs';
import ApiError from './ApiError';

const api = {
  fetchInstance,
  users,
  admin,
  costs,
  ApiError,
};

export default api;
