import { Container } from "./Container";

class B {
  p!: number;
  constructor(p: number) {
    this.p = p;
  }
}

class A {
  b!: B;
  constructor() {
    const container = new Container();
    container.bind("b", B, [10]);
    this.b = container.get('b')
  }
}

const container = new Container();
container.bind("b", B, [10]);
container.bind("a", A, []);

const a = container.get("a");
console.log(a);
