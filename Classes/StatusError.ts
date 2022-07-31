export class StatusError extends Error {
  message: string;
  statusCode = 400;
  /**
   * An Error with a defined status code
   * Example codes:
   * 400 Bad Request,
   * 401 Unauthorized,
   * 403 Forbidden,
   * 404 Not Found,
   * 418 I'm a teapot,
   * 429 Too Many Requests,
   * 500 Internal Server Error,
   * 503 Service Unavailable
   * @param message {string}
   * @param statusCode {number}
   */
  constructor(message: string, statusCode?: number) {
    super(message);
    this.message = message;
    if (statusCode) {
      this.statusCode = statusCode;
    }

    // Object.setPrototypeOf(this, StatusError);
  }
}

export class StatusErrorPreset extends StatusError {
  constructor(preset: ErrorPreset) {
    switch (preset) {
      case ErrorPreset.MissingRequiredFields:
        super(preset, 400);
        break;
      case ErrorPreset.SessionNotValid:
        super(preset, 401);
        break;
      case ErrorPreset.NoPermission:
        super(preset, 401);
        break;
    }
  }
}

export enum ErrorPreset {
  MissingRequiredFields = "Missing 1 or more required fields.",
  SessionNotValid = "Session not valid.",
  NoPermission = "You do not have permission to complete this action.",
}
