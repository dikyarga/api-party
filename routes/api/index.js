var express = require('express');
var router = express.Router();

let authController = require('../../controllers/auth')
let twitterController = require('../../controllers/api/twitter')
let instagramController = require('../../controllers/api/instagram')

router.post('/signup', authController.signup)

router.post('/signin', authController.signin)


/* GET users listing. */
router.get('/hello', function(req, res, next) {
  res.send('Print hello, ' + req.query.name + ' !')
});

router.get('/get-news', twitterController.getNews)
router.get('/my-timeline', twitterController.myTimeline)

module.exports = router;
