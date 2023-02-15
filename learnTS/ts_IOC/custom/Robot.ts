export class Head {
    head = ''
}
export class Arms {
    arm = ''
}
class MockHead extends Head {
    head = '头部'
}
class MockArms extends Arms {
    arm = '胳膊'
}
export class Robot {
    public _head:Head;
    public _arms:Arms;
    constructor(public head:Head,public arms:Arms){
        // this.head = new Headers();
        // this.arms = new Arms();
        this._head = head;
        this._arms = arms;
    }
    move(){

    }
}

const robot = new Robot({head:'头'},{arm:"胳膊"})

const mockRobot = new Robot(new MockHead,new MockArms)