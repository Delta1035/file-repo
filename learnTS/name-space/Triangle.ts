/// <reference path = "IShape.ts" />
namespace Drawing {
    export class Triangle implements IShape {
        draw<T>(): T {
            throw new Error("Method not implemented.");
        }
        
    }
}