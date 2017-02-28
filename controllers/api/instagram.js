// call the models
let db = require('../../models')

// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');
var ig = require('instagram-node').instagram();

// Every call to `ig.use()` overrides the `client_id/client_secret`
// or `access_token` previously entered if they exist.
ig.use({ client_id: 'ea4e788fb1254a509459c9a32619cf26',
    client_secret: '13b759c632624d9691c6b2e0f8585060' });

var redirect_uri = 'http://localhost:3000/api/instagram';

module.exports = {
  getByHashtag: function(req, result, next){
    let keyword = req.query.keyword
    ig.tag_search('query', function(err, result, remaining, limit) {
      console.log('dsfafsfsdfs', result);
    });
  },

  myTimeline: function(req, res, next){
    let screen_name = req.query.screen_name

  }
}
