class FetchClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Статус коды 200 и 204 могут не содержать body, в таком случае парсить и возвращать нечего
  // eslint-disable-next-line consistent-return
  async request(url, options = {}) {
    const response = await fetch(`${this.baseURL}${url}`, options);
    if (!response.ok) {
      throw response;
    }
    const contentLength = response.headers.get('Content-Length');
    if (contentLength) {
      return response.json();
    }
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
    await this.request(url, { method: 'DELETE', ...options });
  }
}

const fetchInstance = new FetchClient('http://127.0.0.1:5000');

export default fetchInstance;
