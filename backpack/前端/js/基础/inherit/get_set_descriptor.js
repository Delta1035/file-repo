/**
 * 存值取值是設置在屬性的Descriptor對象上的
 */
const methodName = Symbol('fangfa');
class CustomHTMLElement {
    constructor(element){
        this.element = element;
    }

    get html(){
        this.element.innerHtml;
    }

    set html(value){
        this.element.innerHtml = value;
    }

    [methodName](){
        console.log('methodName',methodName);
    }
}

const ele = new CustomHTMLElement({innerHtml:'<div>測試</div>'});
const descriptor = Object.getOwnPropertyDescriptor(
    CustomHTMLElement.prototype,'html'
)
ele[methodName]();
console.log(descriptor);
console.log('set' in descriptor);
console.log('get' in descriptor);