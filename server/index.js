'use strict';

var express = require('express');
var logger = require('morgan');
// var favicon = require('serve-favicon');
var path = require('path');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var hbsutils = require('hbs-utils')(hbs);
// var routes = require('./routes/index');
// var i18n = require('i18n');
// var session = require('express-session');
// var FileStore = require('session-file-store')(session);
// var helpers = require('./helpers/index');
var config = require('../config/config');
// var api = require('../server/api/index');

const configLocal = process.env.NODE_ENV === 'development' ? config.development : config.production;

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookieParser());


//# View engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

//# hbs settings
hbs.localsAsTemplateData(app); // locals variable (app.locals.foo = 'bar')  accessed by using {{@foo}}
//hbsutils.registerWatchedPartials(__dirname + '/views/public/partials');

app.locals.hostImages = configLocal.api.hostImages;
app.locals.isProd = process.env.NODE_ENV !== 'development';


//# Static files
app.use(express.static(path.join(__dirname, '../')));


app.use((error, req, res) => {
    const statusCode = error.statusCode || 500;
    const err = {
        error: statusCode,
        message: error.message
    };
    if (!res.headersSent) {
        res.status(statusCode).send(err);
    }
});

module.exports = app;