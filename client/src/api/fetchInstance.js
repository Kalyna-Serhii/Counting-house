class FetchClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(url, options = {}) {
    const response = await fetch(`${this.baseURL}${url}`, options);
    if (!response.ok) {
      throw response;
    }
    return response.json();
  }

  async get(url, options = {}) {
    return this.request(url, { method: 'GET', ...options });
  }

  async post(url, body, options = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      ...options,
    });
  }

  async patch(url, body, options = {}) {
    return this.request(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      ...options,
    });
  }

  async delete(url, options = {}) {
    return this.request(url, { method: 'DELETE', ...options });
  }
}

const fetchInstance = new FetchClient('http://127.0.0.1:3000/api');

export default fetchInstance;
