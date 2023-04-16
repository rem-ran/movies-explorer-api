// импорты
const rateLimit = require('express-rate-limit');

const { rateLimitErrorMsg } = require('../config');

/// ///////////////////////////////////////////////////////////////////////////////////

const rateLimiter = rateLimit({
  // 15 минут
  windowMs: 15 * 60 * 1000,
  // макс 100 запросов с одного IP
  max: 100,
  message: rateLimitErrorMsg,
});

/// ///////////////////////////////////////////////////////////////////////////////////

// экспорт
module.exports = { rateLimiter };
