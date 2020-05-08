// 设置端口1
const port = '3000'
// /引入 koa模块
var Koa = require('koa');
//
var Router = require('koa-router');
var config = require('./config/default.js')
const stc = require('koa-static')
var cors = require('koa2-cors');
var path = require('path');
//实例化1
var app = new Koa();
app.use(cors());

var router = new Router();

//数据库
// var mysql = require('mysql');
// var connection = mysql.createConnection({...config});
// console.log(config.user)
// connection.connect();
// let sql = 'SELECT * FROM lin_user'
// connection.query(sql, function(err, rows, fields) {
//   // if (err) throw err;

//   console.log('The solution is: ', rows,fields);
// });

// connection.end();


//数据库 mongodb
// const mongoose = require('mongoose')

//ctx  上下文 context ，包含了request 和response等信息

//配置路由
router.get('/',async (ctx)=>{
    ctx.body = '是一个首页ma';
})


router.get('/news',async (ctx)=>{
  ctx.body = '<h1>这是new页面</h1>';
})
/*启动路由*/
router.get('/list/:name',async (ctx)=>{
   ctx.body = {
    name: ctx.params.name,
    time: Date.now()
   }
})

const user = new Router({
  prefix: 'user'
})
user.get('/', async ctx => {
  ctx.body = 'user'
})
user.get('/list', async ctx => {
  ctx.body = {a:[1,3,2,4]}
})
user.get('/list:name', async ctx => {
  ctx.body = {
    name: ctx.params.name,
    time: Date.now()
   }
})

app.use(router.routes()) 
app.use(user.routes())  
app.use(router.allowedMethods());   
app.use(user.allowedMethods());   
const staticPath = 'public';
console.log(path,444)
app.use(stc(
  path.join( __dirname, staticPath)
  ))
  //可以配置一个或多个
// app.use(static(__dirname + '/public'))

app.listen(port);