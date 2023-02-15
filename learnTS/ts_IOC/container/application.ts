import { Injectable, Inject } from 'container-ioc';
import { IApplication, IService, TService } from './index';

@Injectable()
export class Application implements IApplication {
    constructor(@Inject(TService) private service: IService) {}
    
    run(): void {
        this.service.serve();
    }
}