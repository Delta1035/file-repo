import { TEXT_ELEMENT } from "./constant";

export function createDom(fiber) {
  // 创建dom(element / text)
  const dom =
    fiber.type === TEXT_ELEMENT
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  // 判断是否是property
    const isProperty = (name:string)=>{name === 'children'}
  // 将props添加到dom上
  Object.keys(fiber.props).filter(isProperty).forEach(prop=>{
    dom[prop] = fiber.props[prop]
  })
  // 送出产生的dom
  return dom;
}
