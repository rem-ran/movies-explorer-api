const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  //15 минут
  windowMs: 15 * 60 * 1000,
  //макс 100 запросов с одного IP
  max: 100,
  message:
    "От вашего IP было совершено слишком много запросов. Попробуйте ещё раз через 15 минут",
});

module.exports = { rateLimiter };
