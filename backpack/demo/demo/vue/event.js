let eventObj = {
    list:{},//存放 订阅的属性 : [订阅者函数]
    listen(key,fn){
        if(!this.list[key]){
            this.list[key] = [];
        }
        typeof fn === 'function' && this.list[key].push(fn);
    },
    trigger(){
        let key = [].prototype.shift.call(arguments);
        let fns = this
    }
}