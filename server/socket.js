const Tokens = require('./controllers/token_controller.js');

//保存手机号和socketId的映射
var PhoneToId = new Map(); //phone=>socket.id

//注册一个观察者
var Observer = (function() {
	//防止消息队列暴露而被篡改故将消息容器作为静态私有变量保存
	var __messages = {};
	return {
		//注册信息接口
		regist: function(type, fn) {
			//如果此消息不存在则应该创建一个该消息类型
			if(typeof __messages[type] === 'undefined') {
				//将动作推入到该消息对应的动作执行队列中
				__messages[type] = [fn];
			} else {
				//将动作方法推入到消息对应的动作执行序列中
				__messages[type].push(fn);
			}
		},
		//发布信息接口
		fire: function(type, args) {
			//如果该消息没有被注册，则返回
			if(!__messages[type])
				return;
			//定义消息信息
			var events = {
					type: type, //消息类型
					args: args || {} //消息携带数据
				},
				i = 0, //消息动作循环变量
				len = __messages[type].length; //消息动作长度
			//遍历消息动作
			for(; i < len; i++) {
				//依次执行注册的消息对应的动作序列
				__messages[type][i].call(this, events);
			}
		},
		//移除信息接口
		remove: function(type, fn) {
			//如果消息动作队列存在
			if(__messagesp[type] instanceof Array) {
				//从最后一个消息动作遍历
				var i = __messages[type].length - 1;
				for(; i >= 0; i--) {
					//如果存在该动作则在消息动作序列中移除相应动作
					__messages[type][i] === fn && __messages[type].splice(i, 1);
				}
			}
		}
	}
})();

/** 
 * 登录管理
 */
_io.on('connection', function(socket) {
	//连接成功
	//首次登陆
	socket.on('login', function(data) {
		//验证token
		let phone = Tokens.getPhone(data.token);
		if(phone) {
			//存在，加入PhoneToId队列
			PhoneToId.set(phone, socket.id);
			socket.emit('login', 'success');
			//发出上线事件
			Observer.fire(phone.toString(), {
				'socketId': socket.id
			});

			return;
		} else {
			//不存在，断开此链接
			socket.emit('login', 'failed');
			setTimeout(() => socket.disconnect(true), 1000)
			return;
		}
	})

	//监听服务信息
	socket.on('server', function(data) {
		let Phone = Tokens.getPhone(data.token);
		if(phone) {

		}
	});
	//监听个人聊天信息
	socket.on('single', function(data) {

	});
	//监听多人聊天信息
	socket.on('mult', function(data) {

	})

	socket.on('liaotian', function(msg) {
		console.log(socket.id + " " + msg)
		//io.emit('liaotian',msg);
		//console.log(io);
		_io.sockets.emit('liaotian', msg);
	});
})

/**
 * 数据格式
 * eg:socket.add(bs.phone,{
		'event':'service',
		'type':'bangyou',
		'data':{
			'type':'getOrder',
			'id':bI._id,
			'getTime':bI.getTime,
			'getUserName':bI.getUserName,
			'getUserPhone':bI.getUserPhone,
			'getUserHeadImgUrl':bI.getUserHeadImgUrl
			}
		})
 */

module.exports = {
	add(phone, data) {
		let socketId = PhoneToId.get(phone);
		//如果该用户上线了，直接给该用户发送数据
		if(socketId) {
			io.sockets.socket(socketId).emit('service', data)
		} else {
			//用户没有上线,注册事件
			//Observer.regist(phone.toString(), (socketId) => io.sockets.socket(socketId).emit('service', data));
		}
	}
}