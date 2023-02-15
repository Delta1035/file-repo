export function Component({ template, style, }) {
    return function (targetClass) {
        Reflect.defineMetadata("template", template, targetClass);
        Reflect.defineMetadata("style", style, targetClass);
    };
}
function Input(alias) {
    return function (targetClass, methodName, descritor) { };
}
export function Readonly({ writable, value, enumerable, configurable, }) {
    return function (targetClassPropertype, methodName, descritor) {
        descritor.writable = writable !== null && writable !== void 0 ? writable : false;
        descritor.configurable = configurable !== null && configurable !== void 0 ? configurable : false;
        descritor.enumerable = enumerable !== null && enumerable !== void 0 ? enumerable : false;
        // return descritor;
    };
}
// configurable?: boolean;
// enumerable?: boolean;
// value?: any;
// writable?: boolean;
// get?(): any;
// set?(v: any): void;
// Object.defineProperty();
