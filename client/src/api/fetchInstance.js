class fetchClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(url, options = {}) {
    const response = await fetch(`${this.baseURL}${url}`, options);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  }

  async get(url, options = {}) {
    return this.request(url, { method: 'GET', ...options });
  }

  async post(url, body, options = {}) {
    return this.request(url, { method: 'POST', body: JSON.stringify(body), ...options });
  }


  async delete(url, options = {}) {
    return this.request(url, { method: 'DELETE', ...options });
  }
}

const fetchInstance = new fetchClient('http://127.0.0.1:3000/api');

export  { fetchInstance };
