import {ApiError} from './ApiError';

class FetchClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(url, options = {}) {
    const response = await fetch(`${this.baseURL}${url}`, options);
    try {
      if (!response.ok) {
        throw response;
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async get(url, options = {}) {
    try {
      return this.request(url, {method: 'GET', ...options});
    } catch (error) {
      throw error;
    }
  }

  async post(url, body, options = {}) {
    try {
      const response = await this.request(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        ...options,
      });
      // if (!response.ok) {
      //   throw response;
      // }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async patch(url, body, options = {}) {
    try {
      const response = await this.request(url, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        ...options,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(url, options = {}) {
    try {
      return this.request(url, {method: 'DELETE', ...options});
    } catch (error) {
      throw error;
    }
  }
}

const fetchInstance = new FetchClient('http://127.0.0.1:3000/api');

export default fetchInstance;
