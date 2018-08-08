/*
 * @name  		开发笔记
 * @author		xiaobaicai
 * @plain		记录该项目开发过程中遇到的困难以及解决方案
 * @startTime	2018/8/5
 * 
 ***
 * 

*** websocket通信   ***
*  最简实例 标准
*服务器	
*  var WebSocketServer = require('ws').Server,
		ws = new WebSocketServer({ port: 8181 });
		ws.on('connection', function (ws) {
  		  	console.log('client connected');
    		ws.on('message', function (message) {
        	console.log(message);
    		});
		});
* 
*客户端
* 	var ws = new WebSocket("ws://localhost:8181");
    ws.onopen = function (e) {
        console.log('Connection to server opened');
    }
    ws.send("hello");
* 
* 
*客户端API
*	ws.readyState :返回当前ws连接状态
* 		CONNECTING 	值为0,表示正在连接
* 		OPEN		值为1,表示连接完成，可以通信
* 		CLOSING		值为2,表示连接正在关闭
* 		CLOSE		值为3,表示连接已关闭,或连接不成功
* 
* 	ws.bufferedAmount:显示当前还有多少数据没有发送出去
* 	
* 	ws.send(data):向服务器发送数据
* 
* 	客户端事件	
* 		open		连接成功后发出此事件
* 		close		连接关闭后发出此事件		code,reason,wasClean
* 		message		接受服务器数据后发出此事件	data
* 		send 		向服务器发送此数据		
* 		err			发生错误时
* 
*websocket实现
* 使用框架 socket.io.js
*
* 服务器
* 	var io = require('socket.io')(http);	//将io加载到http服务中
* 	io.on('connection', function(socket) {
	* 	//服务器监听客户端
		socket.on('CToS', function(data) {
			console.log(msg);
			//服务器发送
			io.emit('SToC', data);
		});
	})
*
* 客户端
*	var socket=io("http://127.0.0.1:3000");	//创建一个连接到指定socket的通信
* 	//客户端发送
*	socket.emit('CToS',{
          'name':'xiaobaicai',
          'msg':'hello',
    });
    //客户端监听
    socket.on('StoC',function(data){
      console.log(data);
    })
    

*** socket.io API
*
*服务端
*io.on('connection',function(socket));	//监听客户端连接，
*io.sockets.emit('string',data);		//给所有客户端广播消息
*io.sockets.socket(socketid).emit('String',data);	//给指定的客户端发送消息
*socket.on('String',function(data));	//监听客户端发送的消息
*socket.emit('Strig',data);				//给该socket的客户端发送消息
*
*客户端socket事件
* socket.emit('String',data); 	//向服务器发送消息
* socket.on('String',data);		//监听来自服务器端的消息
* connect		:连接成功
* connecting	:正在连接
* disconnect	:断开连接
* connect_failed:连接失败
* error			:错误发送，并且无法被其他事件类型处理
* message		:同服务器端message事件
* anything		:同服务器端anything事件
* reconnecting	:正在重连
* reconnect_failed	:重连失败
* reconnect		:成功重连
* 

