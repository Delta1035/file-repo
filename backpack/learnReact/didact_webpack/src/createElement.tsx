import { TEXT_ELEMENT } from "./constant";
import { DidactElement } from "./render";
export function createElement(
  type: string,
  config: { [key: string | symbol | number]: any },
  ...args: Array<DidactElement> 
):DidactElement {
    console.log('createElement >>');
    const props:DidactElement["props"] = Object.assign({children:[]},config);
    const hasChildren = args.length>0;
    // props.children = hasChildren ? [].concat(...args):[];
    props.children = hasChildren ? Array.from(...args as [any] ):[];
    return {type,props};
}

export function createTextElement(value:string){
    return createElement(TEXT_ELEMENT,{nodeValue:value})
}