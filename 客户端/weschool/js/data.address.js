var jnAddress = {}


jnAddress.beiqushuse = [{
	value:"青教公寓",
	text:"青教公寓"
},{
	value:"榴园",
	text:"榴园"
},{
	value:"桂圆",
	text:"桂圆"
},{
	value:"桃园",
	text:"桃园"
},{
	value:"梅园",
	text:"梅园"
},{
	value:"李园",
	text:"李园"
},{
	value:"杏园",
	text:"杏园"
},{
	value:"桔园",
	text:"桔园"
}]
jnAddress.beiquxueyuan = [{
	value:"纺服学院",
	text:"纺服学院"
},{
	value:"机械学院",
	text:"机械学院"
},{
	value:"环土学院",
	text:"环土学院"
},{
	value:"物联网学院",
	text:"物联网学院"
},{
	value:"设计学院",
	text:"设计学院"
},{
	value:"艺术楼",
	text:"艺术楼"
},{
	value:"人文学院",
	text:"人文学院"
},{
	value:"理学院",
	text:"理学院"
}]
jnAddress.beiquqita = [{
	value:"一教",
	text:"一教"
},{
	value:"图书馆",
	text:"图书馆"
},{
	value:"一食堂",
	text:"一食堂"
},{
	value:"二食堂",
	text:"二食堂"
},{
	value:"行政楼",
	text:"行政楼"
},{
	value:"北活",
	text:"北活"
},{
	value:"逸夫楼",
	text:"逸夫楼"
},{
	value:"校医院",
	text:"校医院"
},{
	value:"中心体育场",
	text:"中心体育场"
},{
	value:"体育馆",
	text:"体育馆"
},{
	value:"文浩馆",
	text:"文浩馆"
},{
	value:"设院雕刻室",
	text:"设院雕刻室"
},{
	value:"实验动物楼",
	text:"实验动物楼"
},{
	value:"环土实验室",
	text:"环土实验室"
},{
	value:"机械中心",
	text:"机械中心"
}]


jnAddress.nanqushuse = [{
	value:"留学生公寓",
	text:"留学生公寓"
},{
	value:"涓苑",
	text:"涓苑"
},{
	value:"溪苑",
	text:"溪苑"
},{
	value:"清苑",
	text:"清苑"
},{
	value:"澈苑",
	text:"澈苑"
},{
	value:"瀚苑",
	text:"瀚苑"
},{
	value:"淳苑",
	text:"淳苑"
},{
	value:"润苑",
	text:"润苑"
},{
	value:"浩苑",
	text:"浩苑"
},{
	value:"鸿苑",
	text:"鸿苑"
}]

jnAddress.nanquxueyuan = [{
	value:"医学院",
	text:"医学院"
},{
	value:"药学院",
	text:"药学院"
},{
	value:"食品学院",
	text:"食品学院"
},{
	value:"生工学院",
	text:"生工学院"
},{
	value:"化工学院",
	text:"化工学院"
},{
	value:"马克思主义学院",
	text:"马克思主义学院"
},{
	value:"法学院",
	text:"法学院"
},{
	value:"北美学院",
	text:"北美学院"
},{
	value:"商学院",
	text:"商学院"
},{
	value:"树莓学院",
	text:"树莓学院"
}]

jnAddress.nanquqita = [{
	value:"二教",
	text:"二教"
},{
	value:"南活",
	text:"南活"
},{
	value:"食科实验楼",
	text:"食科实验楼"
},{
	value:"发酵实验室",
	text:"发酵实验室"
},{
	value:"协同创新中心",
	text:"协同创新中心"
},{
	value:"酒博物馆",
	text:"酒博物馆"
},{
	value:"功能食品楼",
	text:"功能食品楼"
},{
	value:"纺织教学楼",
	text:"纺织教学楼"
},{
	value:"三食堂",
	text:"三食堂"
},{
	value:"四食堂",
	text:"四食堂"
},{
	value:"南商",
	text:"南商"
}]

jnAddress.beiqu = [{
	value:"宿舍楼",
	text:"宿舍楼",
	children:jnAddress.beiqushuse
},{
	value:"学院楼",
	text:"学院楼",
	children:jnAddress.beiquxueyuan
},{
	value:"其他",
	text:"其他",
	children:jnAddress.beiquqita
}]




jnAddress.nanqu = [{
	value:"宿舍楼",
	text:"宿舍楼",
	children:jnAddress.nanqushuse
},{
	value:"学院楼",
	text:"学院楼",
	children:jnAddress.nanquxueyuan
},{
	value:"其他",
	text:"其他",
	children:jnAddress.nanquqita
}]



jnAddress.data = [{
	value:"北区",
	text:"北区",
	children:jnAddress.beiqu
},{
	value:"南区",
	text:"南区",
	children:jnAddress.nanqu
}]