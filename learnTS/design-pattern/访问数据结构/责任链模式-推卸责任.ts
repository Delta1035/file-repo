
class Trouble {
    private number: number;
    constructor(number: number) {
        this.number = number;
    }

    getNumber (): number {
        return this.number;
    }

    toString () {
        return `[Trouble ${this.number}]`;
    }
}

abstract class Support {
    private name: string;
    private next?: Support;
    constructor(name: string) {
        this.name = name;
    }

    setNext (next: Support): Support {
        this.next = next;
        return next;
    }

    support (trouble: Trouble) {
        if (this.resolve(trouble)) {
            this.done(trouble);
        } else if (this.next !== null) {
            this.next?.support(trouble);
        } else {
            this.fail(trouble);
        }
    }

    toString (): string {
        return `[ ${this.name} ]`;
    }

    abstract resolve (trouble: Trouble): boolean;
    done (trouble: Trouble): void {
        console.log(trouble + "is resolved by" + this + '.');
    }

    fail (trouble: Trouble) {
        console.log(trouble + 'cannot be resolved.');
    }
}

class NoSupport extends Support {
    constructor(name: string) {
        super(name);
    }
    resolve (trouble: Trouble): boolean {
        return false;
    }
}

class LimitSupport extends Support {
    limit: number;
    constructor(name: string,limit: number) {
        super(name);
        this.limit = limit;
    }
    resolve (trouble: Trouble): boolean {
        if (trouble.getNumber() < this.limit) {
            return true;
        } else {
            return false;
        }
    }

}

class OddSupport extends Support {
    constructor(name: string) {
        super(name);
    }
    resolve (trouble: Trouble): boolean {
        if (trouble.getNumber() % 2 === 0) {
            return true;
        } else {
            return false;
        }
    }

}

class SpecialSupport extends Support {
    private number: number;
    constructor(name: string,number: number) {
        super(name);
        this.number = number;
    }

    resolve (trouble: Trouble): boolean {
        if (trouble.getNumber() === this.number) {
            return true;
        } else {
            return false;
        }
    }
}

function main () {
    const alice = new NoSupport('alice');
    const bob = new LimitSupport('bob',100);
    const charlie = new SpecialSupport('charlie',429);
    const diana = new LimitSupport('diana',200);
    const elmo = new OddSupport('elmo');
    const fred = new LimitSupport('fred',300);
    alice.setNext(bob).setNext(charlie).setNext(diana).setNext(elmo).setNext(fred);
    for (let i = 0; i < 500; i += 33) {
        alice.support(new Trouble(i));
    }
}

main();