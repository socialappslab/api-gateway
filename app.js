var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);



// create the proxy (without context)
/*
    target: 'http://localhost:3024',
    changeOrigin: true
});*/


//Entity Manager
var usersProxy = proxy('http://localhost:3024/users');
var servicesProxy = proxy('http://localhost:3024/services');
var identitiesProxy = proxy('http://localhost:3024/identities');

//Subscription Manager
var eventsProxy = proxy('http://localhost:3023/events');
var subscriptionsProxy = proxy('http://localhost:3023/subscriptions');
var signalsProxy = proxy('http://localhost:3023/signals');
var signallogProxy = proxy('http://localhost:3023/signallog');

// mount `exampleProxy` in web server
var app = express();
app.use(usersProxy);
app.use(servicesProxy);
app.use(identitiesProxy);

app.use(eventsProxy);
app.use(subscriptionsProxy);
app.use(signalsProxy);
app.use(signallogProxy);


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
