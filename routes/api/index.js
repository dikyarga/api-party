var express = require('express');
var router = express.Router();

let authController = require('../../controllers/auth')
let twitterController = require('../../controllers/api/twitter')
let instagramController = require('../../controllers/api/instagram')

let db = require('../../models')
router.get('/apiai', function(req, res, next) {

})
router.post('/signup', authController.signup)

router.post('/signin', authController.signin)


/* GET users listing. */
router.get('/hello', function(req, res, next) {
    res.send('Print hello, ' + req.query.name + ' !')
});



// Twitter
router.get('/get-news', twitterController.getNews)
router.get('/my-timeline', twitterController.myTimeline)

//

router.get('/telegram/users', function(req, res, next){
  db.Telegram.findAll().then((users) => {
    res.json(users)
  })
})

router.get('/telegram/chats', function(req, res, next){
  db.Chat.findAll().then((chats) => {
    res.json(chats)
  })
})

module.exports = router;
