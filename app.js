const Koa = require('koa');
const app = new Koa();
const router = require("./Router/index")
// 4.主程序使用路由
app.use(router.routes());  // 启动路由
app.use(router.allowedMethods());
app.on('error' ,(err) => {
    console.log('koa server failed to start' ,err);
})
app.listen(3000,() =>{
    console.log('koa server start at 3000 port');
})