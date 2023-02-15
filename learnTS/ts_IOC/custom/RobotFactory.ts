import { Robot, Head, Arms } from "./Robot";

export class RobotFactory {
  constructor() {
   
  }

  createRobot():Robot{
    const robot = new Robot(this.createHead(), this.createArms());
    return robot
  }

  createHead(): Head {
    return new Head;
  }

  createArms(): Arms {
    return new Arms;
  }
}
