require('dotenv').config()

module.exports = {
  dev: {
    dbURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.px94k2q.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    port: process.env.PORT || 3000,
    logging: true,
  },
  production: {
    dbURI: '',
    port: 3000,
    logging: false,
  },
  httpResponseCode: {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
  },
}
