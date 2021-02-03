const koa = require("./koa/application")
// const router = require('koa-router')();
const app = new koa()
app.use(async (ctx,next)=>{
    ctx.body = ctx.body +"111"
    // console.time("timer");
    await next()
    ctx.body = ctx.body +"333"
   // console.timeEnd("timer");
})
app.use(async (ctx,next)=>{
    ctx.body = ctx.body + "222"
    await next()
})
app.listen(3000);