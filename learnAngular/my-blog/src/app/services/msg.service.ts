import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MessageType } from '../model/message-type';
@Injectable({
  providedIn: 'root'
})
export class MsgService {

  constructor(private message: NzMessageService) { }

  createMassage(type: MessageType, msg: string) {
    this.message.create(type, msg);
  }

  close(){
    this.message.remove();
  }
}
