/**
 * 学习组合模式能够使容器与内容具有一致性,创造出递归结构的模式即是composite模式,组合模式
 */

abstract class Entry {
    abstract getName (): string;
    abstract getSize (): number;
    abstract add (): void;
    protected printList (prefix: string): void;
    protected printList (): void {

    }
    tostring (): string {
        return this.getName() + '(' + this.getSize() + ')';
    }
}

class CFile extends Entry {
    name: string;
    size: number;
    constructor(name: string,size: number) {
        super();
        this.name = name;
        this.size = size;
    }
    getName (): string {
        return this.name;
    }
    getSize (): number {
        return this.size;
    }
    add (): void {
        throw new Error("Method not implemented.");
    }

}


