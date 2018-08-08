/***
 *全局模块，初始化一些全局使用的信息
 */

//DataType: 存放标准信息格式
const DataType = {};
DataType.User = {
	UserLogin: {
		UserTel: null,
		UserPass: null
	},
	UserReg: {
		UserTel: null,
		UserName: null,
		UserPass: null,
	},
	UserUpdate: {
		UserTel: null,
		OldUserPass: null,
		UserPass: null
	}
}

//Url: 存放API接口地址
const Url = {}
Url.User = {
	Login: "http://192.168.43.227/user/login",
	Reg: "http://192.168.43.227/user/reg",
	update: "http://192.168.43.227/user/update"
}

//Func: 存放常用函数
const Func = {}
Func.toUrl = function(url, data) {
	var Data = url + "?";
	for(var i in data) {
		Data = Data + i + "=" + data[i] + "&"
	}
	Data = Data.slice(0, Data.length - 1);
	return Data;
}

//WeSchoolApp: 存放本地函数
var WeSchoolApp = {};
WeSchoolApp.Token = {
	GetUserToken() {
		var token = plus.storage.getItem("UserToken");
		return token;
	},
	SetUserToken() {
		plus.storage.setItem("UserToken", token);
	},
	removeUserToken() {
		plus.storage.removeItem("UserToken");
	}
}
//正则表达式
WeSchoolApp.regExp = {
	notEmptyReg: /\S/,
	emailReg: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
	mobileReg: /^1[3|4|5|7|8]\d{9}$/
}
WeSchoolApp.getTemplate = function(tmpl, container) {
	mui.ajax(tmpl, {
		type: "GET",
		async: false,
		success: function(res) {
			container.innerText = res;
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}