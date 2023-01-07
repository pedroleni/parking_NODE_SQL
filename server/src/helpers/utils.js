//  ----- Manejador de errores  -------
const setError = (code, message) => {
  const error = new Error();
  error.code = error;
  error.message = message;
  return error;
};
module.exports = {
  setError,
};
