export default class ApiError extends Error {
  constructor(payload) {
    super();
    this.payload = payload;
  }
}
