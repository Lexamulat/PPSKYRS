const ApiError = require('./ApiError');
const CustomError = require('../../../helpers/customError');


module.exports = function (error) {
  if (error instanceof ApiError || error instanceof CustomError)
    return error;
  if (error.errors)
    return ApiError.validation(error);

  if (error.statusCode === 401)
    return ApiError.unauthorizedError(error);

  logger.error(error);
  return ApiError.internalServer();
};
