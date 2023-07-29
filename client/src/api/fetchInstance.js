class FetchClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(url, options = {}) {
    const response = await fetch(`${this.baseURL}${url}`, options);
    if (!response.ok) {
      throw response;
    }
    const data = await response.json();
    return data;
  }

  async get(url, options = {}) {
    return this.request(url, { method: 'GET', ...options });
  }

  async post(url, body, options = {}) {
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
  }

  async patch(url, body, options = {}) {
    const response = await this.request(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      ...options,
    });
    return response;
  }

  async delete(url, options = {}) {
    return this.request(url, { method: 'DELETE', ...options });
  }
}

const fetchInstance = new FetchClient('http://127.0.0.1:3000/api');

export default fetchInstance;
