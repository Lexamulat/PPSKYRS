class ApiError extends Error {

  static validation(error) {
    return new ApiError(error.message, 400, error.errors);
  }

  static information(kind) {
    return ApiError.fieldValidation('common', kind);
  }

  static fieldValidation(field, kind) {
    return new ApiError('Bad Request', 400, {
      [field]: {kind}
    });
  }

  static internalServer() {
    return new ApiError('Internal Server Error', 500);
  }

  static forbiddenError() {
    return new ApiError('Forbidden', 403);
  }

  static unauthorizedError() {
    return new ApiError('Unauthorized', 401);
  }

  static notFound() {
    return new ApiError('Not found', 404);
  }

  static serviceUnavailable() {
    return new ApiError('Service unavailable', 503);
  }

  constructor(message, code, details) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

module.exports = ApiError;
