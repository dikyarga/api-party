var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config()

// var helper = require('./helpers/auth')
//
// var index = require('./routes/index');
// var users = require('./routes/users');
// var usersAPI = require('./routes/api/users');
var indexAPI = require('./routes/api/index');

var app = express();

let db = require('./models')


// BOTBOTBOT

// API AI
var apiai = require('apiai');

var appai = apiai(process.env.APIAI_SECRET);

// Telegram

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_KEY;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
    polling: true
});

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.onText(/\/start/, function(message) {
  const chatId = message.chat.id;

  db.Telegram.findOne({
    where: {
      userid: parseInt(chatId)
    }
  }).then((user) => {
    if (user == null) {
      db.Telegram.create({
        userid: parseInt(message.chat.id),
        username: message.chat.username,
        chatid: parseInt(message.message_id),
        firstname: message.chat.first_name,
        lastname: message.chat.last_name,
      }).then(() => {
        console.log('saved to db');
      })
    }
    bot.sendMessage(message.chat.id, `<Hello  ${message.from.first_name} /> ! You can ask me anything,`);
  })

});

bot.onText(/\/users/, function(message) {
    db.Telegram.findAll().then((allUser) => {
        for (let i = 0; i < allUser.length; i++) {

            bot.sendMessage(message.chat.id, allUser[i].id + ' : '+ allUser[i].firstname);
        }
    })
});

bot.onText(/\/chats/, function(message) {
    db.Chat.findAll().then((allChat) => {
        for (let i = 0; i < allChat.length; i++) {

            bot.sendMessage(message.chat.id, allChat[i].id + ' : '+ allChat[i].text);
        }
    })
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    console.log('-==------------chatid--------------------', chatId);
    db.Telegram.findOne({
        where: {
            userid: parseInt(chatId)
        }
    }).then((user) => {
        console.log('-==------------sama--------------------');
        db.Chat.create({
            text: msg.text,
            chatid: user.id
        })
    })

    // send a message to the chat acknowledging receipt of their message
    var request = appai.textRequest(msg.text, {
        sessionId: '<unique session id>'
    });

    let pro = new Promise(function(resolve, reject) {
        request.on('response', function(response) {
            console.log(response);
            if (response.result.source == 'agent') {
                resolve(response)
            } else {
                reject('Kamu ngomong apa cuy ?!')
            }
        });
    })

    pro.then(function(response) {
        bot.sendMessage(chatId, response.result.fulfillment.speech);
        // bot.sendMessage(chatId, response.result.fulfillment.messages[0].speech);
    }).catch(function(msgs) {
        bot.sendMessage(chatId, msgs);

    })

    request.on('error', function(error) {
        console.log(error);
    });
    request.end();

    // bot.sendMessage(chatId, 'Hi');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', index);
// app.use('/users', users);
// app.use('/api/users', helper.auth, usersAPI);
app.use('/api/', indexAPI);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
