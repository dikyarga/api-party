// call the models
let base64 = require('base-64');
const crypto = require('crypto');

// call the models
let db = require('../models')

module.exports = {
  all: function(req, res){
    db.User.findAll().then(function(users){
      res.json(users);
    })
  },
  show: function(req, res){
    db.User.findById(req.params.id).then((user) => {
      res.json(user)
    })
  },
  create: function(req, res){
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
      res.json('A user created')
    })
  },
  update: function(req, res){
    db.User.update({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      role: req.body.role
    }, {
      where: {
        id: req.params.id
      }
    }).then((user) => {
      if (user == 1) {
        res.json(user)
      } else {
        res.json({
          status: false,
          msg: 'User with id : ' + req.params.id + ' doesnt exist'
        })
      }
    })
  },
  delete: function(req, res){
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.send('User deleted.')
    })
  }
}
