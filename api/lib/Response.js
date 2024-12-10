class Response {
  static SuccessResponse(code = 200, message = 'Success', data = {}) {
    return {
      status: code,
      message: message,
      data: data,
    };
  }

  static ErrorResponse(code = 404, message = 'Error', error = {}) {
    return {
      status: code,
      message: message,
      error: error,
    };
  }
}

module.exports = Response;
