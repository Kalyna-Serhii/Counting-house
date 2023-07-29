class ApiError extends Error {
  constructor(payload) {
    super();
    this.payload = payload;
  }
}

export default ApiError;
