const http = require("http")
const context = require("./context")
const request = require("./request")
const response = require("./response")
// function compose(middleware){
//     return function(ctx,next){
//         let index = -1
//         return dispatch(0)
//         function dispatch(i){
//             if(i <= index ){
//                 return Promise.reject(new Error("what!!"))
//             }
//                 index = i
//                 fn =middleware[i]
//                 if (i === middleware.length){fn = next }
//                 if(!fn){
//                     return Promise.resolve()
//                 }
//                 try {
//                     return Promise.resolve(fn(ctx,dispatch.bind(null,++i)))

//                 } catch (error) {
//                     return Promise.reject(error)

//                 }
//             }
//         }
// }
function compose(middleware){
    return function(ctx,next){
        let copy = middleware.slice(1)
        let res=  copy.reduce((accumulator, currentFn)=>{
            if(!currentFn) {
                return Promise.resolve()
            }
                try {
                    return Promise.resolve(currentFn(ctx,()=>{return accumulator}))
                } catch (error) {
                    return Promise.reject(error)
                }
            
        },Promise.resolve(middleware[0](ctx,()=>{})))
        return res
    }
}
class Koa {
    constructor(options){
        this.options = options
        this.context = context
        this.request = request
        this.response = response
        this.middleware = []
    }
    use(fn){
        if(typeof fn !== "function"){
            throw new Error("not a function")
        }
        this.middleware.push(fn)
    }
    listen(){
        let server =  http.createServer(this.callback())
        server.listen(...arguments)
   }
    callback(){
        let fnMiddleWare = compose(this.middleware)
        let handleRequest = (req,res)=>{
             this.handleRequest(fnMiddleWare,req,res)
        }
        return handleRequest
    }
    handleRequest(fnMiddleWare,req,res){
        let ctx = this.createContext(req,res)
        fnMiddleWare(ctx).then(this.handleResponse(ctx)).catch(this.handleError)
    }
    handleResponse(ctx){
        return function (){
            let body = ctx.body;
            ctx.res.end(body);
        }
    }
    handleError(){}
    createContext(req,res){
        //不会破坏原对象，方便扩展
        let ctx = Object.create(this.context)
        let request = Object.create(this.request)
        let response = Object.create(this.response)
        ctx.request = request
        ctx.response = response
        ctx.req = request.req = req;
        ctx.res = response.res = res;
        this.ctx = ctx
        return ctx
    }
}
module.exports = Koa