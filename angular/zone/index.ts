// @ts-ignore
import('zone.js');
const z = Zone.current.fork({
    name:'judgement',
    properties:{
        name:'z'
    },
    onHasTask:function(){
        console.log('judgement感知到了异步任务调用');
    }
})