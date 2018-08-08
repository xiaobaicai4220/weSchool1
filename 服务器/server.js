var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/weschool');
var app = express();
var ejs = require('ejs');
var jade = require('jade');
var http = require('http').Server(app);

//创建socket连接
var io = require('socket.io')(http);
//将io暴露到全局空间中
global._io = io;

app.set('views','./views'); 
app.set('view engine','jade');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
	secret:'SECRET',
	cookie:{maxAge:60*60*1000},
}));
//导入路由模块和websocket模块
require('./routestest')(app);
require('./socket');
http.listen(80);
console.log('server start port 80');




