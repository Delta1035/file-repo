/**
 * 函数--参数--的双向协变
 * 比较函数参数类型时, 只有当源函数参数能够赋值给目标函数,或者反过来时才能赋值成功. 这是不稳定的,
 * 因为调用者可能传入了一个具有更精确类型信息的函数, 但是调用这个传入的函数的时候却使用了不那么精确的类型
 * 信息.
 */

enum MyEventType {
  Mouse,
  Keyboard,
}

interface MyEvent {
  timetamp: number;
}

interface MyMouseEvent extends MyEvent {
  m: number;
  n: number;
}

// let test:MyMouseEvent = {
//     m: 0,
//     n: 0,
//     timetamp: 0
// }

interface MyKeyEvent extends MyEvent {
  keyCode: number;
}

function listenEvent(eventType:MyEventType,handler:(n:MyEvent)=>void){
    // ...
}
listenEvent(MyEventType.Mouse,(e:MyMouseEvent)=>console.log(e.m+','+e.n);
)