import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({ providedIn: 'root' })
export class ImpTranslateService {
  translateMsg: string = '';
  constructor(
    private translate: TranslateService,
    private message: NzMessageService
  ) {}

  impTranslate(content: string){
    this.translate.get(content).subscribe((value) => {
      this.translateMsg = value;
    });
    return this.translateMsg
  }

  success(content: string, message: string = ''): void {
    this.translate.get(content).subscribe((value) => {
      this.translateMsg = value;
    });
    this.message.success(this.translateMsg + message)
  }

  error(content:string, message?: string){
    // if(content.trim() == ''){
    //   this.message.error(message || '')
    //   return
    // }
    this.translate.get(content).subscribe(val=>{
      this.translateMsg = val
    })
    this.message.error(this.translateMsg + (message?message:''))
  }

  warn(content:string, message: string = ''){
    this.translate.get(content).subscribe(val=>{
      this.translateMsg = val
    })
    this.message.warning(this.translateMsg + message)
  }
}
