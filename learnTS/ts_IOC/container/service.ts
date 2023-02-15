import { Injectable } from "container-ioc";
import { IService } from "./index";

@Injectable()
export class Service implements IService {
    serve(): void {
        // serves
    }
}