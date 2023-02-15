"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotFactory = void 0;
var Robot_1 = require("./Robot");
var RobotFactory = /** @class */ (function () {
    function RobotFactory() {
    }
    RobotFactory.prototype.createRobot = function () {
        var robot = new Robot_1.Robot(this.createHead(), this.createArms());
        return robot;
    };
    RobotFactory.prototype.createHead = function () {
        return new Robot_1.Head;
    };
    RobotFactory.prototype.createArms = function () {
        return new Robot_1.Arms;
    };
    return RobotFactory;
}());
exports.RobotFactory = RobotFactory;
//# sourceMappingURL=RobotFactory.js.map