const User = require('../models/user')
const { comparePassword } = require('../helpers/bcryptjs')
const { tokenGenerate } = require('../helpers/jwt')

class UserController {
  static register(req, res, next) {
    const { username, email, password, batch,  } = req.body
    User.create({ username, email, password })
      .then(user => {
        let payload = {
          id: user._id
        }
        let token = tokenGenerate(payload)
        res.status(201).json({ token, username: user.username })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const { email, password } = req.body
    User.findOne({ email })
      .then(user => {
        if (user && comparePassword(password, user.password)) {
          let payload = {
              id: user._id
          }
          let token = tokenGenerate(payload)
          res.status(200).json({ token, username: user.name })
        } else {
            next({
              status: 400,
              message: `Invalid Email/Password`
            })
          }
        })
      .catch(next)
  }
}

module.exports = UserController