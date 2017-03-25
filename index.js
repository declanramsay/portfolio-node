var functions = require('firebase-functions');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: functions.config().twitter.consumer.key,
  consumer_secret: functions.config().twitter.consumer.secret,
  access_token_key: functions.config().twitter.token.key,
  access_token_secret: functions.config().twitter.token.secret
});

exports.twitterFeed = functions.https.onRequest((req, res) => {
  let screenName = 'thelucideffect';
  return client.get('statuses/user_timeline', { screen_name: screenName, count: 2})
    .then((tweets) => {
      res.status(200);
      res.send(tweets);
      return;
    })
    .catch((err) => {
      res.status(400);
      res.send(err);
      return;
    });
});
