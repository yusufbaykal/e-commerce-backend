module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-backend',
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  JWT: {
    SECRET: process.env.JWT_SECRET || 'default_secret',
    EXPIRES_TIME: !isNaN(parseInt(process.env.JWT_EXPIRES_TIME)) ? parseInt(process.env.JWT_EXPIRES_TIME) : 86400,
  },
};
