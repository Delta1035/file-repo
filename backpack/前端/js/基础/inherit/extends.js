"use strict";
/**
 * 1. 将父类的原型对象作为子类的原型对象
 * 2. 子类的原型对象的构造函数指向子类本身
 * 3. 将父类作为子类的原型对象
 * @param {*} subClass
 * @param {*} superClass
 */
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
/**
 * Object.setPrototypeOf(obj,prototype); 
 * 1. 将父类作为子类的原型对象
 * @param {*} o
 * @param {*} p
 * @returns
 */
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf
    ? Object.setPrototypeOf.bind()
    : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };
  return _setPrototypeOf(o, p);
}

//编译前
var Sup = /*#__PURE__*/ (function () {
  function Sup(name, sex) {
    this.name = name;
    this.sex = sex;
  }

  var _proto = Sup.prototype;

  _proto.showName = function showName() {
    console.log(this.name);
  };

  Sup.supHello = function supHello() {
    console.log(12);
  }; // ...

  return Sup;
})();

var Sub = /*#__PURE__*/ (function (_Sup) {
    /**
     * 子类继承父类的原型
     * 1. 讲父类的原型对象作为子类的原型对象
     * 2. 讲子类原型对象的constructor指向子类本身
     * 3. 讲父类作为子类的隐式(__proto__)原型对象
     */
  _inheritsLoose(Sub, _Sup);

  function Sub(name, sex, age) {
    var _this;
    // 调用父类构造函数,this指向当前实例
    // 也就是实例属性继承
    _this = _Sup.call(this, name, sex) || this;
    _this.age = age;
    return _this;
  }

  var _proto2 = Sub.prototype;

  _proto2.showAge = function showAge() {
    console.log(this.age);
  };

  return Sub;
})(Sup);

console.log(Sub.__proto__ ===  Sup);
