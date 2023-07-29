const events = require("events");
/**
 * 1. 一般fs, net ,http 等都是继承了events.EventEmitter对象
 * 2. on, emit , once , removeListener,
 * 3. removeAllListener([eventName]), setMaxListeners(number)
 * 4. listeners(event) 返回指定事件的监听器数组
 * 5. listenCount(emitter,event) 返回指定事件监听器的数量
 *      events.emitter.listenerCount(eventName)
 */

class MyEvent extends events.EventEmitter {}
