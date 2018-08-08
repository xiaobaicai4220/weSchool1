require('../models/userInfo_model.js');
var mongoose = require('mongoose');
var UserInfo = mongoose.model('UserInfo');
var Tokens = require('./token_controller.js');

function findUserInfo() {
	UserInfo.findOne({
		'phone': phone
	})
}

function getSignature() {
	var signatureList = ['我期待的,黑暗中的光', '我相信这里的人都懂分手的痛，所以才会在这诉说',
		'以后再拿我爱的人来开玩笑，我TM分分钟教你怎么做人', 　　'我有一个不追却特别喜欢的人', 　
		'感情不必拿来感慨 深爱不需拿来显摆',
		'比起空间我更喜欢来这里 因为没顾忌',
		'彼此都固执的不肯让步 就算受伤',
		'年轻只有一次 不疯狂怎么和儿子说当年。',
		'能坚持爱一个不爱自己的人 我好勇敢',
		'杂草多的地方庄稼少，空话多的地方智慧少。',
		'总有一天你会感谢现在的疼',
		'沉默的人只是不想和你多说废话 就是这样',
		'为他习惯晚睡，可他早已熟睡',
		'没有人一路单纯到底，但请别忘了最初的自己',
		'离开的意思是回不来了',
		'我们总会被现在打败是吗',
		'陪在身边才算拥有，爱到最后才算长久',
		'你是不是也会觉得自己很多余才会先离开的',
		'哦，恩，呵呵，三句话聊垮一个人。',
		'我笑得没心没肺 那是我发泄最好的方式',
		'问君能有几多愁，花似亦梦也能容。',
		'你不言不语给我脸色看 是要我跟你低头认错吗、',
		'身边的人一个一个的离开,你终得习惯以这种方式存在',
		'有没有一种思念永不疲惫',
		'谁寂寞了繁华，埋葬了天涯，散尽一身的戎甲。',
		'只是怀念你，怀念一个不属于我的你',
		'让未来到来，让过去过去',
		'如果等待只能成为等待',
		'我想知道，我的另一半在哪里！',
		'感谢那些看透了我，却还一直陪在我身边的人。',
		'放弃，是最痛的残害，始终会放弃',
		'孤独的人知道，寂寞并非消遣丶',
		'多少时候，因为得不到，所以假装不想要。',
		'欲哭之泪何唤无词、又感冒了，唉唉唉',
		'有时候，让别人在乎你的最好办法，就是不那么在乎他。',
		'咱们时常只是以钟点工的形式出现在某个人生命中',
	]
	return(signatureList[Math.floor(Math.random() * 36)]);
}

module.exports = {
	createUserInfo(phone) {
		var userInfo = new UserInfo({
			'phone': phone
		});
		userInfo.set('backgroundImgUrl', "image/guide/2.jpg");
		userInfo.set('userHeaderImgUrl', "image/head13.jpg");
		userInfo.set('userSignature', getSignature());
		userInfo.set('name', phone);
		userInfo.set('sex', 'woman');
		userInfo.set('birth', ' ');
		userInfo.set('school', ' ');
		userInfo.set('institute', ' ');
		userInfo.set('major', ' ');
		userInfo.set('grade', ' ');
		userInfo.set('hometown', ' ');
		userInfo.save(function(err) {
			if(err) {
				console.log("UserInfo创建表出现错误");
				console.log("Phone" + phone);
			}
			console.log("创建成功" + phone);
		})
	},
	updateHeaderImg(req, res) {

	},
	updateSignature(req, res) {
		if(req.body.token) {
			let phone = Tokens.getPhone(req.body.token);
			if(phone) {
				UserInfo.findOne({
						'phone': phone
					})
					.exec(function(err, userInfo) {
						if(err) {
							console.log(err);
							res.json({
								type: 1
							})
							return;
						}
						userInfo.set('userSignature', req.body.userSignature);
						userInfo.save(function(err) {
							if(!err) {
								console.log("修改用户个性签名");
								console.log("用户: " + phone + " 个性签名:" + req.body.userSignature);
								res.json({
									type: 0
								});
								return;
							} else {
								console.log(err);
							}

						})

					})
			}
			res.json({
				type: 1
			});
			return;
		}
	},
	updateUserInfo(req, res) {
		if(!req.body.token) {
			console.log("不存在token")
			res.json({
				type: 1
			});
			return;
		}
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			console.log("存在token");
			UserInfo.findOne({
					'phone': phone
				})
				.exec(function(err, userInfo) {
					if(err) {
						console.log(err);
						res.json({
							type: 1
						});
						return;
					}
					if(!userInfo) {
						console.log("UserInfo表查询phone: " + req.body.userInfo.phone + "失败");
						res.json({
							type: 1
						});
						return;
					}
					userInfo.set('userSignature', req.body.userInfo.userSignature);
					userInfo.set('name', req.body.userInfo.name);
					userInfo.set('sex', req.body.userInfo.sex);
					userInfo.set('birth', req.body.userInfo.birth);
					userInfo.set('school', req.body.userInfo.school);
					userInfo.set('institute', req.body.userInfo.institute);
					userInfo.set('major', req.body.userInfo.major);
					userInfo.set('grade', req.body.userInfo.grade);
					userInfo.set('hometown', req.body.userInfo.hometown);
					userInfo.save(function(err) {
						if(err) {
							console.log("用户数据保存失败");
							console.log("用户名:" + req.body.userInfo.name);
							console.log("用户" + JSON.stringify(req.body))
							res.json({
								type: 1
							})
							return;
						} else {
							console.log("hello");
							res.json({
								type: 0
							})
							return;
						}
					})
				})
		} else {
			res.json({
				type: 1
			});
			return;
		}
	},
	getOtherUserInfo(req, res) {
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			UserInfo.findOne({
					'phone': req.body.phone
				})
				.exec(function(err, userInfo) {
					if(err) {
						console.log(err);
						res.json({
							type: 1
						});
						return;
					}
					if(!userInfo) {
						console.log(phone + "试图查询一个不存在的账号");
						res.json({
							type: 1
						});
						return;
					}
					res.json({
						'type': 0,
						'userInfo': userInfo
					});
					return;
				})
		} else {
			res.json({
				'type': 1
			});
			return;
		}
	},
	getUserInfo(req, res) {
		console.log("req.body" + JSON.stringify(req.body));
		//res.json({type:1});
		if(!req.body.token) {
			console.log("发现无token请求");
			res.json({
				type: 1
			});
			return;
		}
		let phone = Tokens.getPhone(req.body.token);
		console.log("getPhone");
		if(phone) {
			console.log("DB search");
			UserInfo.findOne({
					'phone': phone
				})
				.exec(function(err, userInfo) {
					/*
					if(err) {
						console.log(err);
						res.json({
							'type': 1
						});
						return;
					}
					if(!userInfo) {
						console.log(phone + "用户信息不存在");
						res.json({
							'type': 1
						});
						//res.end();
						return;
					}
					*/
					console.log(JSON.stringify(userInfo)); //'userInfo': userInfo
					res.json({
						'type': 0,
						'userInfo': userInfo
					});
					//res.end();
					return;
				})
		} else {
			res.json({
				'type': 1
			});
			return;
		}
	}
}