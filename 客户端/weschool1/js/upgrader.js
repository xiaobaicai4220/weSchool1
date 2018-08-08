var curVer = null; //当前版本号
function initUpdate() {
	//取当前App的版本号
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		curVer = inf.version;
		//检测更新
		checkUpdate();
	});
}

//检测升级函数
function checkUpdate() {
	//读取远程升级说明文件
	mui.ajax(api_url.upgradeTxtUrl, {
		type: "GET",
		dataType: "json",
		cache: false,
		success: function(res) {
			//取到新版本号
			var newVer = res.Android.version;
			var uptxt = res.Android.note;
			var upgurl = res.Android.url;
			//如果需要升级
			if(compareVersion(curVer, newVer)) {
				mui.confirm("更新详情:\n" + uptxt, "发现新版本 " + newVer, ["立即升级", "取消"], function(e) {
					//如果选择升级，打开升级小窗口
					if(e.index == 0) {
						plus.webview.create("upgrade.html", "upgrade.html", {
							width: '300px',
							height: '150px',
							margin: "auto",
							background: "rgba(0,0,0,0.4)",
							scrollIndicator: 'none',
							scalable: false,
							popGesture: 'none'
						}, {
							upgurl: upgurl
						});
					}
				})
			}

		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}
//比较两个版本号
function compareVersion(oldVer, newVer) {
	if(!oldVer || !newVer || oldVer == "" || newVer == "") {
		return false;
	}
	var oldVer_array = oldVer.split(".");
	var newVer_array = newVer.split(".");
	for(i = 0; i < oldVer_array.length && i < newVer_array.length; i++) {
		var oldNumber = parseInt(oldVer_array[i]);
		var newNumber = parseInt(newVer_array[i]);
		if(newNumber > oldNumber || newNumber.length > oldNumber.length) {
			return true;
		} else if(newNumber < oldNumber) {
			return false;
		}
	}
	if(newVer_array.length > oldVer_array.length && newVer.indexOf(oldVer) == 0) {
		return true;
	}
}