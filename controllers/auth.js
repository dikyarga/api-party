let base64 = require('base-64');
const crypto = require('crypto');

// call the models
let db = require('../models')

// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');


module.exports = {
    signup: function(req, res) {
        let salt = base64.encode(req.body.email)
        db.User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            role: req.body.role,
            salt: salt,
            password: crypto.createHmac('sha256', salt)
                .update(req.body.password)
                .digest('hex')
        }).then(() => {
            res.json('User registered!')
        })
    },
    signin: function(req, res) {
        db.User.find({
            where: {
                email: req.body.email
            }
        }).then((user) => {
          var token = jwt.sign({
            user_id: user.id
          }, 'shhhhh');

            if (user == null) {
                console.log('Authentication success');
                res.json({
                  token: token
                })
            } else {
                const hash = crypto.createHmac('sha256', user.salt)
                    .update(req.body.password)
                    .digest('hex');
                if (user.password == hash) {
                    console.log('Authentication success');
                    res.json({
                      token: token
                    })
                } else {
                    console.log('Authentication fail');
                    res.send('Authentication fail')

                }
            }
        })
    }
}
