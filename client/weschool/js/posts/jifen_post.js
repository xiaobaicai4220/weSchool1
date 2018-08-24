
//测试
			function createJifen(){
				mui.ajax(ws.ws_url.jifen.create, {
					type: "POST",
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					data: JSON.stringify({'token':ws.token.getUserToken(),'pass':'123456'}),
					success: function(data) {
						if(data.type == 0) {
							//通知主界面刷新.
							console.log("创建积分账号成功");
							return;
						} 
						if(data.type == 1){
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
