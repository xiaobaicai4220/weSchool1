var a = '1533606317620'
var date = new Date(parseInt(a))
var now = new Date();
var str = '';
if(now.getMonth() == date.getMonth() && now.getDay() == date.getDay()){
	str += '今天';
}else if(now.getMonth() == date.getMonth() && now.getDay()-1 == date.getDay()){
	str += '昨天';
}else if(now.getMonth() == date.getMonth() && now.getDay()-2 == date.getDay()){
	str += '前天';
}else{
	str += (date.getMonth()+1)+"月"+date.getDay()+"日";
}
str += date.getHours()+":"+date.getMinutes();
console.log(str);
