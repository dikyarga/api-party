var jwt = require('jsonwebtoken');
let db = require('../models')

module.exports = {
    auth: function(req, res, next) {
        let token = req.headers.token
        if (token) {
            jwt.verify(token, 'shhhhh', function(err, decoded) {

                if (err) {
                    res.send('Token not valid!')
                } else {
                    next()
                }
            });
        } else {
            res.send('Auth fail')
        }
    },
    isAdmin: function(req, res, next){
      let token = req.headers.token
      if (token) {
          jwt.verify(token, 'shhhhh', function(err, decoded) {
              if (err) {
                  res.send('Token not valid!')
              } else {
                db.User.findById(decoded.user_id).then((user) => {
                  if (user.role == 'admin') {
                    next()
                  } else {
                    res.send('You are not admin!')
                  }
                })
              }
          });
      } else {
          res.send('No auth stored')
      }
    }
}
