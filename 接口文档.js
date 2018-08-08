
/***
 *@name weschool接口文档
 *@author xiaobaicai
 *@startTime 2018/7/26
 *@lastTime  2018/7/26
 **
 
**命名规范
*普通命名采用驼峰命名,
*className,modelName 首字母大写
 
 
** login模块
*客户端:	/login/getCode	  		{phone}
			/login/veriLogin		{phone,veri}
			/login/passLogin		{phone,pass}
			/login/regLogin			{phone,pass,veri}
		
 服务器:	login.js	getCode    	{type,code}		type 0:获取验证码成功 1:错误
						veriLogin  	{type,token}	type 0:登录成功 1：验证码错误
						passLogin 	{type,token}	type 0:登录成功 1：用户不存在 2：密码错误
						regLogin	{type,token}	type 0:注册成功 1：验证码错误 2：用户已存在

** userInfo模块
*客户端 	/userInfo/updateHeaderImg 
				{token,ImgData} 
			/userInfo/updateSignature
				{token,signature}
			/userInfo/updateUserInfo
				{token,userInfo}
			/userInfo/getUserInfo
				{token,phone}
				
 服务器 	userInfo.js updateHeaderImg {type,url}	type 0:上传成功 1:上传失败， url:上传后Img在服务器中的地址
						updayeSignature {type}		type 0:修改成功 1:修改失败
						updateUserInfo  {type}		type 0:成功 	1:失败
						getUserInfo 	{type,userInfo} 
 
 数据库 	用户注册账号后，随机分配一个ID,
			