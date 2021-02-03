const context = {
}
context.defineGetter = function (type,key){
    this.__defineGetter__(key,function (){
        return this[type][key]
    })
}
context.defineSetter = function (type,key){

    this.__defineSetter__(key,function (val){
       
        return this[type][key] = val
    })
}
context.defineGetter('request','headers')
context.defineGetter('response','body')
context.defineSetter('response','body')


module.exports = context