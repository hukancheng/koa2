// 设置端口1
const port = '3000'
// /引入 koa模块
var Koa = require('koa');

var Router = require('koa-router');
var config = require('./config/default.js')
const static = require('koa-static')
var cors = require('koa2-cors');
var path = require('path');
//实例化
var app = new Koa();
app.use(cors());

var router = new Router();

//数据库
var mysql = require('mysql');
var connection = mysql.createConnection({...config});
console.log(config.user)
connection.connect();
let sql = 'SELECT * FROM lin_user'
connection.query(sql, function(err, rows, fields) {
  // if (err) throw err;

  console.log('The solution is: ', rows,fields);
});

connection.end();


//ctx  上下文 context ，包含了request 和response等信息

//配置路由
router.get('/',async (ctx)=>{
    ctx.body = '是一个首页';
})


router.get('/news',async (ctx)=>{
  console.log(12324122312)
  ctx.body = '<h1>这是new页面</h1>';
})
/*启动路由*/

app.use(router.routes())   
app.use(router.allowedMethods());   
const staticPath = 'public';
console.log(path,444)
app.use(static(
  path.join( __dirname, staticPath)
  ))
  //可以配置一个或多个
// app.use(static(__dirname + '/public'))

app.listen(port);