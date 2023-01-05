const corsMiddleware = require('restify-cors-middleware2')

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['*'],
  exposeHeaders: ['*']
})

module.exports = cors
