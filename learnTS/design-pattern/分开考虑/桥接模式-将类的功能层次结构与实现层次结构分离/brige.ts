/**
 * 将类的功能层次和实现层次区分开来
 * 将抽象部分与它的实现部分分离，使它们都可以独立地变化。
 * 桥接模式 桥接的是类功能的实现和类功能的抽象
 * 功能类调用抽象的实现类,至于这个实现类到底怎么实现,不去要去关心,这样就将功能类和抽象类解耦了
 * 实现类通过继承等方式不断新增功能,他们依赖的是抽象类的接口而不是实例
 */

class Display {
    private impl: DisplayImpl;
    constructor(impl: DisplayImpl) {
        this.impl = impl;
    }

    open (): void {
        this.impl.rawOpen();
    }

    print (): void {
        this.impl.rawPrint();
    }

    close (): void {
        this.impl.rawClose();
    }

    display (): void {
        this.open();
        this.print();
        this.close();
    }
}

class CountDisplay extends Display {
    constructor(impl: DisplayImpl) {
        super(impl);
    }

    multiDisplay (times: number): void {
        this.open();
        for (let i = 0; i < times; i++) {
            this.print();
        }
        this.close();
    }
}

abstract class DisplayImpl {
    abstract rawOpen (): void;
    abstract rawPrint (): void;
    abstract rawClose (): void;
}

class StringDisplayImpl extends DisplayImpl {
    private str: string;
    private length: number;
    constructor(str: string) {
        super();
        this.str = str;
        this.length = this.str.length;
    }
    rawOpen (): void {
        console.log('stringDisplayImpl rawOpen');
    };
    rawPrint (): void {
        console.log(`|${this.str}|`);
    };
    rawClose (): void {
        console.log('stringDisplayImpl rawClose');
    };
}

function main (): void {
    const d1 = new Display(new StringDisplayImpl('hello china'));
    const d2 = new CountDisplay(new StringDisplayImpl('hello world'));
    const d3 = new CountDisplay(new StringDisplayImpl('hello universal'));
    d1.display();
    d2.display();
    d3.multiDisplay(3);

}

main();