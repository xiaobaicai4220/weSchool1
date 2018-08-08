/**
 * 用户初始化模块
 * 用于在创建新用户时在各数据库中创建相应的表
 */


var userInfo = require('./userInfo_controller');
var jifen = require('./jiFen_controller');


module.exports = {
	userInit(phone){
		userInfo.createUserInfo(phone);
		jifen.create(phone);
		return true;
	},
}
