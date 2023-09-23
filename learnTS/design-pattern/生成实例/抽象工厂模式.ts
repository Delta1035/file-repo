/**
 * 抽象工厂是将抽象的零件组装为抽象产品
 * 所谓抽象就是只关注接口不关注具体实现
 */
import fs from 'fs';

abstract class Item {
    protected caption?: string; // 标题
    constructor(caption: string) {
        this.caption = caption;
    }
    abstract makeHtml (): string;
}

abstract class Link extends Item { // 超链接
    protected url?: string;
    constructor(caption: string,url: string) {
        super(caption);
        this.url = url;
    }
}

abstract class Tray extends Item {
    protected tray: Item[] = [];
    public constructor(caption: string) {
        super(caption);
    }
    public add (item: Item): void {
        this.tray.push(item);
    }
}

abstract class Page {
    protected title: string;
    protected author: string;
    protected content: Item[] = [];
    constructor(title: string,author: string) {
        this.title = title;
        this.author = author;
    }

    public add (content: Item): void {
        this.content.push(content);
    }

    public ouput () {
        try {
            const fileName = this.title + '.html';
            fs.writeFileSync(fileName,this.makeHtml());
            console.log(fileName + '编写完成');

        } catch (error) {
            console.log(error);
        }
    }

    public abstract makeHtml (): string;
}

abstract class Factory {
    public static getFactory<T extends Factory> (klass: new () => T): T | undefined {
        let factory: T | undefined = void 0;
        try {
            factory = new klass();
        } catch (error) {
            console.log(error);
        }
        return factory;
    }

    public abstract createLink (caption: string,url: string): Link;
    public abstract createTray (option: string): Tray;
    public abstract createPage (title: string,author: string): Page;
}

// 实际类

class ListLink extends Link {
    constructor(caption: string,url: string) {
        super(caption,url);
    }
    public makeHtml (): string {
        return `<li><a href=${this.url}>${this.caption}</a></li>`;
    }
}

class ListTray extends Tray {
    constructor(caption: string) {
        super(caption);
    }
    public makeHtml (): string {
        const tray = this.tray.map(item => {
            return item.makeHtml();
        }).join('\n');
        return `<li><ul>${tray}</ul></li>`;
    }
}

class ListPage extends Page {
    constructor(title: string,author: string) {
        super(title,author);
    }

    public makeHtml (): string {
        const str = `<html><head><title>${this.title}</title></head>
        <body>
        <h1>
            ${this.title}
        </h1>
        <ul>
            ${this.content.map(item => item.makeHtml()).join('\n')}
        </ul>
        <hr>
        <address>${this.author}</address>
        </body>
        </html>`;
        return str;
    }
}

class ListFactory extends Factory {
    public createLink (caption: string,url: string): Link {
        return new ListLink(caption,url);
    }
    public createTray (option: string): Tray {
        return new ListTray(option);
    }
    public createPage (title: string,author: string): Page {
        return new ListPage(title,author);
    }

}

function main (): void {
    const facotry = Factory.getFactory(ListFactory);
    if (facotry) {
        const people = facotry.createLink('人名日报','www.people.com.cn');
        const gmw = facotry.createLink('光明','www.gmw.com');
        const newsTray = facotry.createTray('日报');
        newsTray.add(people);
        newsTray.add(gmw);
        const page = facotry.createPage('LinkPage','德尔塔');
        page.add(newsTray);
        page.makeHtml();
        page.ouput();
    }
}

main();