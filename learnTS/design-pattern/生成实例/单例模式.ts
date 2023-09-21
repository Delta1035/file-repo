
export class Singleton {
    private static singleton: Singleton = new Singleton();
    private constructor() {
        console.log('生成了一个实例');
    }
    public static getInstance (): Singleton {
        return this.singleton;
    }
}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2);
