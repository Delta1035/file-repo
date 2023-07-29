// worker 分为专有woker 和 共享woker
// 1. 专用worker仅仅能被生成它的脚本所使用

/**
 * 使用方式:
 * 1. 判断环境是否支持worker
 * 2. new Worker('worker脚本src')
 * 3. worker使用postMessage 发送数据到 worker线程
 * 4. worker使用self.onmessage = function(e) 监听消息事件拿到数据
 * 5. worker线程和主线程使用postMessage方法传出数据, 使用onmessage监听事件接受数据
 */
if(window.Worker){
    console.log('start',first.value,second.value);
    // 判断浏览器是否支持worker
    const myWorker = new Worker('./worker.js');

    // 给worker传递消息

    first.oninput = function($event){
        myWorker.postMessage([first.value,second.value])
        console.log('Message posted to worker',first.value);
    }

    second.oninput = function($event){
        myWorker.postMessage([first.value,second.value])
        console.log('Message posted to worker',second.value);
    }

    myWorker.onmessage = function(e){
        console.log('来自worker返回的消息',e.data);
        // 返回两数乘积
        product.innerText = e.data
    }
}