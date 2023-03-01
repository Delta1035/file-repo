import { TEXT_ELEMENT } from "./constant";

export interface DidactElement {
  type: string;
  props: {
    children: Array<DidactElement>;
    [key: string | symbol | number]: any;
  };
}
const isListener = (name: string) => name.startsWith("on");
const isAttribute = (name: string) => name !== "children" && !isListener(name);
const isTextElement = (type: string) => type === TEXT_ELEMENT;
export function render(element: DidactElement, parentDom: HTMLElement) {
  const { type, props } = element;
  const dom: HTMLElement | Text = isTextElement(type)
    ? document.createTextNode("")
    : document.createElement(type); // 创建符合当前元素类型的标签
  if (dom instanceof HTMLElement) {
    Object.keys(props)
      .filter(isListener)
      .forEach((name) => {
        const eventType = name.toLowerCase().substring(2); // 去除on 就是事件类型
        dom.addEventListener(eventType, props[name]); // 事件属性对应的值就是监听执行的函数
      });
    Object.keys(props)
      .filter(isAttribute)
      .forEach((name) => {
        dom.setAttribute(name, props[name]); // 设置dom属性(属于html attribute 才会生效)
      });
    const childElements = props.children || []; // 获取该元素的子元素
    childElements.forEach((childElement) => render(childElement, dom)); // 渲染所有子元素并加入到当前dom
  }
  parentDom.appendChild(dom); // 加入到父节点

  let nextUnitOfWork = null;

  function workLoop(deadline: IdleDeadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
      shouldYield = deadline.timeRemaining() < 1; // 小于1 时间不够了 就不能不再继续while循环了.
      // 主线程剩余时间大于1则执行, 低优先级
    }
    requestIdleCallback(workLoop);
  }
  requestIdleCallback(workLoop);

  function performUnitOfWork(nextUnitOfWork) {
    // TODO
  }
}
