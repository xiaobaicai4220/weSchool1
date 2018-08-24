/**
 * 主界面函数,包含一些main.html中运行的函数
 * 需要先引入ws.js  mui.js
 */

var main = {};
main.func = {
	init: function() {
		//初始化函数初始获取用户资料
		if(ws.flags.download.userInfo) {
			//需要获取用户初始信息
			mui.ajax(ws.ws_url.userInfo.getUserInfo, {
				type: "POST",
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				data: JSON.stringify({'token':ws.token.getUserToken()}),
				success: function(data) {
					//对结果进行测试
					if(data.type == 0 && data.userInfo){
						console.log(data.userInfo);
						ws.dataType.userInfo = data.userInfo;
						ws.data.userInfo.setUserInfo();
						ws.flags.download.userInfo = false;
						return;
					}
					//如果没有收到合适的信息那么再次向服务器发送请求
					setTimeout(main.func.init(),3*60*1000);
				},
				err: function(xhr, type, errorThrown) {
					//异常处理；
					alert(type);
					setTimeOut(main.func.init(),3*60*1000);
				}
			});

		}
	},
}