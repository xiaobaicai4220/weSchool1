var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
 
var session=require('express-session');
app.use(session({
 secret: 'keyboard cat',
 resave: false,
 saveUninitialized: true,
 //cookie: { secure: true }
}));
 
//模板引擎
app.set("view engine","ejs");
//静态服务
app.use(express.static('./public'));
 
var alluser=[];
//中间件
//显示首页
app.get('/',function(req,res,next){
  res.render('index');
});
 
//确认登录，检查此人是否有用户名 昵称不能重复
app.get('/check',function(req,res,next){
  var yonghuming=req.query.yonghuming;
 
  if(!yonghuming){
    res.send('必须填写用户名');
    return;
  }
 
  if(alluser.indexOf(yonghuming) != -1){
    res.send('用户名重名');
    return;
  }
 
  alluser.push(yonghuming);
 
  console.log(alluser);
 
  req.session.yonghuming=yonghuming;
  res.redirect("/chat");
});
 
//聊天室
app.get('/chat',function(req,res,next){
  //console.log(req.session.yonghuming);
  //console.log(123);
  if(!req.session.yonghuming){
    res.redirect("/");
    return;
  }
  res.render('chat',{
    'yonghuming':req.session.yonghuming
  });
});
 
io.on('connection',function(socket){
	console.log("连接成功");
  socket.on('liaotian',function(msg){
    console.log(msg);
    //io.emit('liaotian',msg);
    //console.log(io);
    io.emit('liaotian',msg);
  });
  setTimeout(function(){
  	io.emit('liaotian',{ neirong: '111 ', ren: ' 欢迎：xiaobaicai' });
  },3000)
})
 
//监听端口
http.listen(3000);
console.log('server start port 3000');

