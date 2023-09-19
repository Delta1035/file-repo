/**
 * 再模板方法模式中,处理流程的实现交由子类实现,但是整个流程其实在父类 中已经定义好了 即 display() 方法
 * 父类子类的相互协作才能支撑整个程序,具体的实现放在子类还是父类需要权衡,过多的方法实现放在父类会让子类
 * 更加轻松,但是灵活性不够,但是父类中实现的方法过少,子类又会变得臃肿不堪,甚至导致各个子类之间出现代码重复
 */
export abstract class AbstractDisplay {
    count = 0;
    public abstract open (): void;
    public abstract print (): void;
    public abstract close (): void;
    public display (): void {
        console.log('父类已经调用了' + this.count + '次display方法');
        this.open();
        for (let i = 0; i < 5; i += 1) {
            this.print();
        }
        this.close();
    }
}

export class CharDisplay extends AbstractDisplay {
    #char: string;
    constructor(s: string) {
        super();
        this.#char = s;
    }
    public open (): void {
        console.log('<<');
    }
    public print (): void {
        console.log(this.#char);
    }
    public close (): void {
        console.log('>>');
    }
}

const charDisplay = new CharDisplay('H');
charDisplay.display();
interface a { }
interface b { }
interface c extends a,b { }