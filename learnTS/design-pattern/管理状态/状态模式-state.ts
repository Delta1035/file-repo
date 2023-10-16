

abstract class State {
    public abstract doClock (context: Context,hour: number): void;
    public abstract doUse (context: Context): void;
    public abstract doAlarm (context: Context): void;
    public abstract doPhone (context: Context): void;
}

class DayState extends State {
    private static singleton = new DayState();
    private constructor() { // 隐藏构造函数
        super();
    }
    public static getInstance (): DayState {
        return DayState.singleton;
    }
    public doClock (context: Context,hour: number): void {
        if (hour < 9 || hour >= 17) {
            context.changeState(NightState.getInstance());
        }
    }
    public doUse (context: Context): void {
        context.recordLog('使用金库（白天）');
    }
    public doAlarm (context: Context): void {
        context.callSecurityCenter('按下警铃（白天）');

    }
    public doPhone (context: Context): void {
        context.callSecurityCenter('正常通话（白天）');
    }

    public toString (): string {
        return '白天';
    }
}

class NightState extends State {
    private static singleton = new NightState();
    private constructor() {
        super();
    }
    public static getInstance (): NightState {
        return NightState.singleton;
    }
    public doClock (context: Context,hour: number): void {
        if (hour >= 9 || hour < 17) {
            context.changeState(DayState.getInstance());
        }
    }
    public doUse (context: Context): void {
        context.callSecurityCenter('紧急：晚上使用金库！！！');
    }
    public doAlarm (context: Context): void {
        context.callSecurityCenter('按下警铃（晚上）');
    }
    public doPhone (context: Context): void {
        context.recordLog("晚上的通话录音");
    }

    public toString (): string {
        return '晚上';
    }

}

abstract class Context {
    public abstract setClock (hour: number): void;
    public abstract changeState (state: State): void;
    public abstract callSecurityCenter (msg: string): void;
    public abstract recordLog (msg: string): void;
}

