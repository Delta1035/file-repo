
export abstract class Product {
    public abstract use (): void;
}

export abstract class Factory {
    public abstract createProduct (): Product;
    public abstract registerProduct (p: Product): void;
    public create (): Product {
        const product = this.createProduct();
        this.registerProduct(product);
        return product;
    }
}

export class IDCard extends Product {
    owner: any;
    public use (): void { }
    public getOwner () {
        return this.owner;
    }
}

export class IDCardFactory extends Factory {
    owners = [];
    public createProduct (): Product {
        return new IDCard();
    }
    public registerProduct (): void {
        throw new Error("Method not implemented.");
    }
    public getOwners () {
        return this.owners;
    }
}
