var ws = {};
//持久化token
ws.token = {
	getUserToken: function() {
		var token = plus.storage.getItem("UserToken");
		return token;
	},
	setUserToken: function(Token) {
		plus.storage.setItem("UserToken", Token);
	},
	removeUserToken: function() {
		plus.storage.removeItem("UserToken");
	}
}

//存储值键对  此处不完善.记得完善
ws.key = {
	getValue:function(key){
		var value = JSON.parse(plus.storage.getItem(key));
		return value;
	},
	setValue:function(key,value){
		value = JSON.stringify(value);
		plus.storage.setItem(key,value);
		return;
	},
	removeKey:function(key){
		plus.storage.removeItem(key);
	}
}


//存储用户个人资料 
ws.data = {}
ws.data.userInfo = {
	getUserInfo: function() {
		return JSON.parse(plus.storage.getItem("userInfo"));
	},
	setUserInfo: function() {
		plus.storage.setItem("userInfo", JSON.stringify(ws.dataType.userInfo));
	}
}



/** 标准化数据格式  **/
ws.dataType = {};
ws.dataType.login = {
	getCode: {
		phone: null
	},
	veriLogin: {
		phone: null,
		veri: null
	},
	passLogin: {
		phone: null,
		pass: null
	},
	regLogin: {
		phone: null,
		pass: null,
		veri: null
	}
}
ws.dataType.bangyou = {
	release: {
		code: null,
		location: "小东门",
		time: "今天",
		jifen: "20",
		isOfficial: false,
		remarks: " ",
		address: null,
		addressId:null,
	},
}

ws.dataType.address = {
	add: {
		Aname: null,
		Aphone: null,
		Aaddress: "北区,宿舍楼,桃园",
		AaddressDetail: null,
		isDefault: false
	},
	delete: {
		id: null
	},
	update: {
		id: null,
		Aname: null,
		Aphone: null,
		Aaddress: "北区,宿舍楼，桃园",
		AaddressDetail: null,
		isDefault: false
	}
}

ws.dataType.userInfo = {
	backgroundImgUrl: "image/guide/2.jpg",
	userHeaderImgUrl: "image/head13.jpg",
	userSignature: "I am xiaobaicai",
	name: "小白菜",
	sex: "woman",
	birth: "1997-02-04",
	school: "江南大学",
	institute: "物联网工程学院",
	major: "计算机科学与技术",
	grade: "大一",
	hometown: "江西 上饶",
}

ws.flags = {}
ws.flags.time = {
	bangyoutime:null,
}

ws.flags.download = {
	userInfo: true,
}
ws.flags.upload = {
	userInfo: false,
}

/** 后端数据接口 **/
ws.ws_url = {}
ws.ws_url.ori = "http://192.168.43.227/"
//登录接口
ws.ws_url.login = {
	getCode: ws.ws_url.ori + "login/getCode",
	veriLogin: ws.ws_url.ori + "login/veriLogin",
	passLogin: ws.ws_url.ori + "login/passLogin",
	regLogin: ws.ws_url.ori + "login/regLogin"
}
//用户资料页接口
ws.ws_url.userInfo = {
	updateHeaderImg: ws.ws_url.ori + "userInfo/updateHeaderImg",
	updateSignature: ws.ws_url.ori + "userInfo/updateSignature",
	updateUserInfo: ws.ws_url.ori + "userInfo/updateUserInfo",
	getOtherUserInfo: ws.ws_url.ori + "userInfo/getOtherUserInfo",
	getUserInfo: ws.ws_url.ori + "userInfo/getUserInfo"
}
//地址页接口
ws.ws_url.address = {
	add: ws.ws_url.ori + "address/add",
	delete: ws.ws_url.ori + "address/delete",
	update: ws.ws_url.ori + "address/update",
	get: ws.ws_url.ori + "address/get"
}
//帮柚页面接口
ws.ws_url.bangyou = {
	put:ws.ws_url.ori +"bangyou/put",
	getList:ws.ws_url.ori + "bangyou/getList",
	accept:ws.ws_url.ori + "bangyou/accept",
	del:ws.ws_url.ori + "bangyou/del",
	getBS:ws.ws_url.ori + "bangyou/get/BS",
	getBI:ws.ws_url.ori + "bangyou/get/BI",
	getBE:ws.ws_url.ori + "bangyou/get/BE",
	endGeter:ws.ws_url.ori + "bangyou/end/geter",
	endPuter:ws.ws_url.ori + "bangyou/end/puter"
}
//积分页面接口 
ws.ws_url.jifen = {
	create:ws.ws_url.ori + "jifen/create",
	query:ws.ws_url.ori + "jifen/query"
}



/** 函数接口 **/
ws.func = {
	extend: function(target, source) {
		for(var property in source) {
			target[property] = source[property];
		}
		return target;
	},
}