class Stack {
    dataStore = {};
    count = 0;
    constructor() {

    }

    push(value) {
        this.dataStore[this.count++] = value;
    }
    // 出栈并返回栈顶值
    pop() {
        const value = this.dataStore[--this.count];
        delete this.dataStore[this.count];
        return value;
    }
    // 返回栈顶值
    peek() {
        return this.dataStore[this.count - 1];
    }

    clear() {
        for(let ele in this.dataStore){
            delete this.dataStore[ele];
        }
        this.count = 0;
    }


}

module.exports = Stack;