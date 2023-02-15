class Queue {
    constructor() {
        this.count = 0;
        this.lowestCount = 0; //追踪队首元素
        this.items = {};
    }
    // 入队 在队尾加一个或多个
    enqueue(ele) {
        this.items[this.count] = ele;
        this.count++;
    }
    // 出队 移除队首
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const header = this.items[this.lowestCount];
        delete this.items[this.lowestCount++];//移动队首元素的序号
        // this.count --; 不能减去
        return header;
    }
    // 返回队首元素信息 不对队列做改动
    peek() {
        if (this.isEmpty()) return undefined;
        return this.items[this.lowestCount];
    }
    // 是否是空队列
    isEmpty() {
        return this.count - this.lowestCount === 0;
    }
    // 返回队列长度
    size() {
        return this.count - this.lowestCount;
    }
    // 清空队列
    clear() {
        if (!this.isEmpty()) this.dequeue();
    }
    // 转换字符串
    toString() {
        if (this.isEmpty()) return '';
        return Object.values(this.items).join('');
    }
}

const queue1 = new Queue();
queue1.enqueue(1);
queue1.enqueue(2);
queue1.enqueue(3);
queue1.enqueue(4);
queue1.dequeue();
queue1.dequeue();
queue1.dequeue();
queue1.dequeue();
console.log(queue1, queue1.toString(),queue1.size(),queue1.isEmpty());