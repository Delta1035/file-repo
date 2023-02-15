export function Component({
  template,
  style,
}: {
  template: string;
  style: string;
}) {
  return function (targetClass) {
    Reflect.defineMetadata("template", template, targetClass);
    Reflect.defineMetadata("style", style, targetClass);
  };
}

function Input(alias?: string) {
  return function (targetClass, methodName, descritor) {};
}

export function Readonly({
  writable,
  value,
  enumerable,
  configurable,
}: {
  writable?: boolean;
  value?: any;
  enumerable?: boolean;
  configurable?: boolean;
}) {
  return function (
    targetClassPropertype,
    methodName,
    descritor: PropertyDescriptor
  ) {
    descritor.writable = writable??false;
    descritor.configurable = configurable??false;
    descritor.enumerable = enumerable??false;
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
