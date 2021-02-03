const koa = require("./koa/application")
// const router = require('koa-router')();
const app = new koa()
app.use(async (ctx,next)=>{
    ctx.body = {a:1}
    
    // console.time("timer");
    await next()
    ctx.body = ctx.body +"3c"
   // console.timeEnd("timer");
})
app.use(async (ctx,next)=>{
    ctx.body = ctx.body + "2b"
    await next()
})
app.listen(3000);