var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//静态服务
app.use(express.static('./public'));

var alluser = [];
//中间件
//显示首页

app.post('/hello', function(req, res) {
	
})

io.on('connection', function(socket) {
	console.log("连接成功");
	socket.on('liaotian', function(msg) {
		console.log(msg);
		//io.emit('liaotian',msg);
		//console.log(io);
		io.emit('liaotian', msg);
	});
	setTimeout(function() {
		io.emit('liaotian', {
			neirong: '111 ',
			ren: ' 欢迎：xiaobaicai'
		});
	}, 3000)
})
//监听端口
http.listen(3000);
console.log('server start port 3000');