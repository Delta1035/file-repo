import { Container } from "./container";
class B {
    constructor(p) {
        this.p = p;
    }
}
class A {
    constructor() {
        const container = new Container();
        container.bind("b", B, [10]);
        this.b = container.get('b');
    }
}
const container = new Container();
container.bind("b", B, [10]);
container.bind("a", A, []);
const a = container.get("a");
console.log(a);
