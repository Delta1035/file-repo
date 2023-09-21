export abstract class Builder {
    public abstract makeTitle (title: string): void;
    public abstract makeString (str: string): void;
    public abstract makeItems (items: string[]): void;
    public abstract close (): void;
}


class Director {
    private builder!: Builder;
    constructor(entity: Builder) {
        this.builder = entity;
    }
    public construct (): void {
        this.builder.makeTitle('Greeting');
        this.builder.makeString('从早上到下午');
        this.builder.makeItems([
            '早上好',
            '下午好'
        ]);
        this.builder.makeString('晚上');
        this.builder.makeItems([
            '晚上好',
            '晚安',
            '玛卡巴卡',
            '再见'
        ]);
        this.builder.close();
    }
}

class TextBuilder extends Builder {
    private stringBuffer?: Buffer;
    public makeTitle (title: string): void {
        console.log('title :>>',title);
    }
    public makeString (str: string): void {
        console.log('str :>>',str);
    }
    public makeItems (items: string[]): void {
        console.log('items :>>',items.join(' | '));

    }
    public close (): void {
        console.log('close');
    }


}

class HTMLBuilder extends Builder {
    public makeTitle (title: string): void {
        console.log('title :>>',`<h1>${title}</h1>`);
    }
    public makeString (str: string): void {
        console.log('str :>>',`<span>${str}</span>`);
    }
    public makeItems (items: string[]): void {
        console.log('items ********************');
        items.forEach(item => {
            console.log('item :>>',`<span>${item}</span>`);
        });
        console.log('items ********************');
    }
    public close (): void {
        console.log('close');
    }


}
const textBuilder = new TextBuilder();
const htmlBuilder = new HTMLBuilder();
const director = new Director(textBuilder);
const director2 = new Director(htmlBuilder);
director.construct();
director2.construct();