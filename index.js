const fs = require("fs")
const koa = require("./koa/application")
// const router = require('koa-router')();
const app = new koa()
app.use(async (ctx,next)=>{
    // ctx.body = ctx.body +"1a"
    // ctx.body = {a:1}
    ctx.body = fs.createReadStream("./gitignore")
    await next()
    // ctx.body = ctx.body +"3c"
})
app.use(async (ctx,next)=>{
    // ctx.body = ctx.body + "2b"
    await next()
})
app.listen(3000);