/// <reference path = "IShape.ts" />
namespace Drawing {
    export class Circle implements IShape{
       public draw<T>(): T {
            throw new Error("Method not implemented.");
        }
        
    }
}