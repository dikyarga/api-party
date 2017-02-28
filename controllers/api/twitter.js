// call the models
let db = require('../../models')

// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');
var OAuth = require('oauth');
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.TWITTER_REQUEST_TOKEN,
    process.env.TWITTER_ACCESS_TOKEN,
  '1.0A',
  null,
  'HMAC-SHA1')


module.exports = {
  getNews: function(req, result, next){
    let keyword = req.query.keyword
    oauth.get(
      'https://api.twitter.com/1.1/search/tweets.json?q=%40' + keyword,
      process.env.TWITTER_USER_TOKEN, //test user token
      process.env.TWITTER_USER_SECRET, //test user secret
      function (e, data, res){
        if (e) console.error(e);
        result.send(data)
        console.log(require('util').inspect(data));
      });
  },

  myTimeline: function(req, res, next){
    let screen_name = req.query.screen_name
    oauth.get(
      'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + screen_name +'&count=10',
      process.env.TWITTER_USER_TOKEN, //test user token
      process.env.TWITTER_USER_SECRET, //test user secret
      function (e, data, result){
        if (e) console.error(e);
        res.send(data)
        console.log(require('util').inspect(data));
      });
  }
}
