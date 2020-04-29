const routes = require('express').Router();
const User = require('./user')

routes.use('/user', User)

module.exports = routes