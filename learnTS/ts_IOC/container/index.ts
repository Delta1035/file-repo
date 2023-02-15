import { Container } from "container-ioc";
import { Application } from "./application";
import { Service } from "./service";
export interface IApplication {
  run(): void;
}

export interface IService {
  serve(): void;
}

export const TApplication = Symbol("IApplication");

export const TService = Symbol("IService");

let container = new Container();

container.register([
  { token: TApplication, useClass: Application },
  { token: TService, useClass: Service },
]);

console.log('container',container);
