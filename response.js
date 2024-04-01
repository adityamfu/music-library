// response.js
const sendResponse = (
  res,
  data,
  message = "Response success",
  pagination = {
    prev: "",
    next: "",
    max: "",
  }
) => {
  res.json({ data, message, pagination });
};

const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

module.exports = {
  sendResponse,
  sendError,
};
