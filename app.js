/* global __dirname */
var express      = require('express');
var app          = express();
var port         = 3000;
var mongoose     = require('mongoose');
var passport     = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var flash        = require('connect-flash');

var configDB = require('./config/db.js');
mongoose.connect(configDB.url);

app.use(express.static(__dirname + '/public'));

require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'someSecret' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./app/routes.js')(app, passport);
require('./app/services.js')(app);

app.listen(port);
console.log('Listening on port ' + port);