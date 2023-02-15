// 双端队列（deque，或称 double-ended queue）是一种允许我们同时从前端和后端添加和移除
// 元素的特殊队列
// 例子:
// [操作1,操作2,操作3,操作4]
// 撤销 -> [操作1,操作2,操作3] 从末尾去除操作4
// 执行 -> [操作1,操作2,操作3] 从头到尾执行操作1 2 3
// 执行操作 遵循队列的先进先出 撤销操作遵循栈的后进先出
// 双端队列 序列号不是按照顺序来的.或者说 根本没有index 和js中的数组不一样
class Deque {
    constructor() {
        this.queue = {};
        this.count = 0;
        this.head = 0;

    }

    // add to head
    addFront(item) {
        // 0 的左边 属于队首
        this.queue[--this.head] = item;
    }

    removeFront() {
        if (this.isEmpty()) return;
        const front = this.queue[this.head];
        delete this.queue[this.head++];
        return front;
    }

    removeBack() {
        if (this.isEmpty()) return;
        const back = this.queue[--this.count];
        delete this.queue[this.count];
        return back;
    }

    addBack(item) {
        // 0 包括 0的右边 属于队尾
        this.queue[this.count++] = item;
    }
    //   -2 -1 0 1
    size() {
        return this.count - this.head;
    }

    isEmpty() {
        return (this.count - this.head) === 0 ? true : false;
    }

    frontTop() {
        if (this.isEmpty()) return;
        return this.queue[this.head]
    }

    backTop() {
        if (this.isEmpty()) return;
        return this.queue[this.count - 1];
    }
}

const deq = new Deque();
deq.addFront('a');
deq.addFront('b');
deq.addBack('x');
deq.addBack('y');
console.log(deq);
console.log(deq.isEmpty());
console.log(deq.size());
console.log(deq, deq.frontTop(), deq.backTop());
console.log(deq.removeBack());
console.log(deq.removeBack());
console.log(deq.removeFront());
console.log(deq.removeFront());
console.log(deq, deq.frontTop(), deq.backTop());
