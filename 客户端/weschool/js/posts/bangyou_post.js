
//发布帮柚订单
var bangyouInfo = {
	code: '120435',
	location: "小东门",
	time: "今天",
	jifen: "20",
	isOfficial: false,
	remarks: "hello",
	address: "北区桃园",
	addressId:"51544548",
}

function put() {
	mui.ajax(ws.ws_url.bangyou.put, {
		type: "POST",
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		data: JSON.stringify({
			'token': ws.token.getUserToken(),
			'putUserName':ws.data.userInfo.getUserInfo().name,
			'putUserHeaderImgUrl':ws.data.userInfo.getUserInfo().userHeaderImgUrl,
			'bangyouInfo':bangyouInfo
		}),
		success: function(data) {
			if(data.type == 0) {
				//通知主界面刷新.
				console.log("创建积分账号成功");
				return;
			}
			if(data.type == 1) {
				console.log("不能创建重复积分账号");
				return;
			}
			console.log("创建失败");
			return;
		},
		err: function(xhr, type, errorThrown) {
			异常处理
			alert(type);
		}
	})
}

//测试
function getList() {
	mui.ajax(ws.ws_url.bangyou.getList, {
		type: "POST",
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		data: JSON.stringify({
			'token': ws.token.getUserToken(),
			'time': (new Date()).getTime().toString()
		}),
		success: function(data) {
			if(data.type == 0) {
				//通知主界面刷新.
				console.log(JSON.stringify(data.list));
				return;
			}
			if(data.type == 1) {
				console.log("不能创建重复积分账号");
				return;
			}
			console.log("创建失败");
			return;
		},
		err: function(xhr, type, errorThrown) {
			异常处理
			alert(type);
		}
	})
}

/** 接受订单  **/
function accept() {
	mui.ajax(ws.ws_url.bangyou.accept, {
		type: "POST",
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		data: JSON.stringify({
			'token': ws.token.getUserToken(),
			'userName':ws.data.userInfo.getUserInfo().name,
			'userHeadImgUrl':ws.data.userInfo.getUserInfo().userHeaderImgUrl,
			'_id':'5b67eaf816f2e01b68301cc4',
		}),
		success: function(data) {
			if(data.type == 0) {
				//通知主界面刷新.
				console.log("创建积分账号成功");
				return;
			}
			if(data.type == 1) {
				console.log("不能创建重复积分账号");
				return;
			}
			console.log("创建失败");
			return;
		},
		err: function(xhr, type, errorThrown) {
			异常处理
			alert(type);
		}
	})
}

/**  del 删除订单  **/
function del() {
	mui.ajax("http://192.168.43.227/bangyou/del", {
		type: "POST",
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		data: JSON.stringify({
			'token': ws.token.getUserToken(),
			'_id':'5b67eaf816f2e01b68301cc4',
		}),
		success: function(data) {
			if(data.type == 0) {
				//通知主界面刷新.
				console.log("创建积分账号成功");
				return;
			}
			if(data.type == 1) {
				console.log("不能创建重复积分账号");
				return;
			}
			console.log("创建失败");
			return;
		},
		err: function(xhr, type, errorThrown) {
			异常处理
			alert(type);
		}
	})
}

/** getBS 获得未完成订单  **/
function getBS() {
	mui.ajax(ws.ws_url.bangyou.getBS, {
		type: "POST",
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		data: JSON.stringify({
			'token': ws.token.getUserToken(),
			'time':(new Date()).getTime().toString(),
		}),
		success: function(data) {
			if(data.type == 0) {
				//通知主界面刷新.
				console.log("创建积分账号成功");
				return;
			}
			if(data.type == 1) {
				console.log("不能创建重复积分账号");
				return;
			}
			console.log("创建失败");
			return;
		},
		err: function(xhr, type, errorThrown) {
			异常处理
			alert(type);
		}
	})
}

/* getBI 获得正在进行中的订单 */
function getBI() {
	mui.ajax(ws.ws_url.bangyou.getBI, {
		type: "POST",
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		data: JSON.stringify({
			'token': ws.token.getUserToken(),
			'time':(new Date()).getTime().toString(),
		}),
		success: function(data) {
			if(data.type == 0) {
				//通知主界面刷新.
				console.log("创建积分账号成功");
				return;
			}
			if(data.type == 1) {
				console.log("不能创建重复积分账号");
				return;
			}
			console.log("创建失败");
			return;
		},
		err: function(xhr, type, errorThrown) {
			异常处理
			alert(type);
		}
	})
}

/* getBE 获得正在进行中的订单 */
function getBE() {
	mui.ajax(ws.ws_url.bangyou.getBE, {
		type: "POST",
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		data: JSON.stringify({
			'token': ws.token.getUserToken(),
			'time':(new Date()).getTime().toString(),
		}),
		success: function(data) {
			if(data.type == 0) {
				//通知主界面刷新.
				console.log("创建积分账号成功");
				return;
			}
			if(data.type == 1) {
				console.log("不能创建重复积分账号");
				return;
			}
			console.log("创建失败");
			return;
		},
		err: function(xhr, type, errorThrown) {
			异常处理
			alert(type);
		}
	})
}

/** endGeter 接受者确认订单完成 **/
function endGeter(){
	mui.ajax(ws.ws_url.bangyou.endGeter, {
		type: "POST",
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		data: JSON.stringify({
			'token': ws.token.getUserToken(),
			'_id':'5b67eaf816f2e01b68301cc4',
		}),
		success: function(data) {
			if(data.type == 0) {
				//通知主界面刷新.
				console.log("创建积分账号成功");
				return;
			}
			if(data.type == 1) {
				console.log("不能创建重复积分账号");
				return;
			}
			console.log("创建失败");
			return;
		},
		err: function(xhr, type, errorThrown) {
			异常处理
			alert(type);
		}
	})
}

/**  endPuter  发布者确认订单完成  **/
function endPuter(){
	mui.ajax(ws.ws_url.bangyou.endPuter, {
		type: "POST",
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		data: JSON.stringify({
			'token': ws.token.getUserToken(),
			'_id':'5b67eaf816f2e01b68301cc4',
		}),
		success: function(data) {
			if(data.type == 0) {
				//通知主界面刷新.
				console.log("创建积分账号成功");
				return;
			}
			if(data.type == 1) {
				console.log("不能创建重复积分账号");
				return;
			}
			console.log("创建失败");
			return;
		},
		err: function(xhr, type, errorThrown) {
			异常处理
			alert(type);
		}
	})
}
