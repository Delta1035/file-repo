"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _constant = require("./constant");

var isListener = function isListener(name) {
  return name.startsWith("on");
};

var isAttribute = function isAttribute(name) {
  return name !== "children" && !isListener(name);
};

var isTextElement = function isTextElement(type) {
  return type === _constant.TEXT_ELEMENT;
};

function render(element, parentDom) {
  var type = element.type,
      props = element.props;
  var dom = isTextElement(type) ? document.createTextNode("") : document.createElement(type); // 创建符合当前元素类型的标签

  if (dom instanceof HTMLElement) {
    Object.keys(props).filter(isListener).forEach(function (name) {
      var eventType = name.toLowerCase().substring(2); // 去除on 就是事件类型

      dom.addEventListener(eventType, props[name]); // 事件属性对应的值就是监听执行的函数
    });
    Object.keys(props).filter(isAttribute).forEach(function (name) {
      dom.setAttribute(name, props[name]); // 设置dom属性(属于html attribute 才会生效)
    });
    var childElements = props.children || []; // 获取该元素的子元素

    childElements.forEach(function (childElement) {
      return render(childElement, dom);
    }); // 渲染所有子元素并加入到当前dom
  }

  parentDom.appendChild(dom); // 加入到父节点
}