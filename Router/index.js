const Router = require('koa-router');
const router = new Router
const http = require("../superAgent/http")

router.get('/getPicList/:index',   async ctx =>{
    let index = ctx.params.index;
    let type = ctx.query.type || "dongman"
    console.log(type);
    let {getPage}  = http;
    const data = await getPage(index, type);
    ctx.body = data
})

router.get('/getPicDetailUrl/:index',   async ctx =>{
    const {getPicDetailPage} = http;
    let index = ctx.params.index;
    let type = ctx.query.type || "dongman"
    const data = await getPicDetailPage(index,type)
    ctx.body = data
})

module.exports = router