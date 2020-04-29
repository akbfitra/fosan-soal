const { verifyToken } = require ('../helpers/jwt') 
const User = require('../models/user')

const authentication = (req, res , next) => {
  const decode = verifyToken(req.headers.accesstoken)
  User.findById(decode.id)
    .then( data => {
      if( data ){
        req.user = decode
        next()
      } else {
        next({
          status: 400,
          message: `Your Account is Not Registered`
        })
      }
    })
    .catch(next)
}
module.exports = authentication