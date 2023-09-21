
export interface Product {
    use (s: string): void;
    createClone (): Product;
}


export class Manager {
    public showCase (): void { }
}