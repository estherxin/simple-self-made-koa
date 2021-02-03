module.exports = {
    _body:'',
    get body(){
        return this._body
    },
    set body(newVal){
        if(typeof newVal !== 'string'){
            if(Object.prototype.toString.call(newVal) === '[object Object]') {
                 newVal = JSON.stringify(newVal)
                 return this._body = newVal
            }
            newVal = newVal.toString()
        }
        this._body = newVal
    }    
}