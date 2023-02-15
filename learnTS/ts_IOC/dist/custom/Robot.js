"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = exports.Arms = exports.Head = void 0;
var Head = /** @class */ (function () {
    function Head() {
        this.head = '';
    }
    return Head;
}());
exports.Head = Head;
var Arms = /** @class */ (function () {
    function Arms() {
        this.arm = '';
    }
    return Arms;
}());
exports.Arms = Arms;
var MockHead = /** @class */ (function (_super) {
    __extends(MockHead, _super);
    function MockHead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.head = '头部';
        return _this;
    }
    return MockHead;
}(Head));
var MockArms = /** @class */ (function (_super) {
    __extends(MockArms, _super);
    function MockArms() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.arm = '胳膊';
        return _this;
    }
    return MockArms;
}(Arms));
var Robot = /** @class */ (function () {
    function Robot(head, arms) {
        this.head = head;
        this.arms = arms;
        // this.head = new Headers();
        // this.arms = new Arms();
        this._head = head;
        this._arms = arms;
    }
    Robot.prototype.move = function () {
    };
    return Robot;
}());
exports.Robot = Robot;
var robot = new Robot({ head: '头' }, { arm: "胳膊" });
var mockRobot = new Robot(new MockHead, new MockArms);
//# sourceMappingURL=Robot.js.map