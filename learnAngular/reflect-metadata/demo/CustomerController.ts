import { LogService } from "./LogService";

export class CustomerController {

    private log!:LogService;
    private token = '1233-213-12-123';

    constructor(){
        this.log = new LogService;
    }

    public main():void{
        this.log.info('its running')
    }
}