export class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServerError";
  }
}

export class AdbError extends Error {
  constructor(message) {
    super(message);
    this.name = "AdbError";
  }
}
