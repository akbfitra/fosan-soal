const Soal = require('../models/quote')

const authorization = (req, res, next) => {
  const _id = req.params.id
  Soal.findOne ({ _id, owner: req.user.id })
    .then(data => {
      if (data) {
        next ()
      } else {
        next({
          status: 400,
          message: `Not Your Account`
        })
      }
    })
    .catch(next)
}

module.exports = authorization