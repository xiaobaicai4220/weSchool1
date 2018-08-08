var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/weschool');
var app = express();


var ejs = require('ejs');
var jade = require('jade');


app.set('views','./views'); 
app.set('view engine','jade');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
	secret:'SECRET',
	cookie:{maxAge:60*60*1000},
}));
require('./routestest')(app);
app.listen(80);

//配置websocket服务
