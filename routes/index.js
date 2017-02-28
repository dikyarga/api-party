var express = require('express');
var router = express.Router();

let twitterController = require('../controllers/twitter')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-news', function(req, res, next){})

module.exports = router;
