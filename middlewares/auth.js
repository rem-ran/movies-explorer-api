// импорты
const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');

const { authErrorMsg } = require('../config');

/// ///////////////////////////////////////////////////////////////////////////////////

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    return next(new AuthError(authErrorMsg));
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    return next(new AuthError(authErrorMsg));
  }

  req.user = payload;

  return next();
};
