class CustomError extends Error {

  static validation(error) {
    return new CustomError(error.message, 400, error.errors);
  }

  static information(kind) {
    return CustomError.fieldValidation('common', kind);
  }

  static fieldValidation(field, kind) {
    return new CustomError('Bad Request', 400, {
      [field]: {kind}
    });
  }

  static internalServer() {
    return new CustomError('Internal Server Error', 500);
  }

  static forbiddenError() {
    return new CustomError('Forbidden', 403);
  }

  static unauthorizedError() {
    return new CustomError('Unauthorized', 401);
  }

  static notFound() {
    return new CustomError('Not found', 404);
  }

  static serviceUnavailable() {
    return new CustomError('Service unavailable', 503);
  }

  constructor(message, code, details) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

module.exports = CustomError;
