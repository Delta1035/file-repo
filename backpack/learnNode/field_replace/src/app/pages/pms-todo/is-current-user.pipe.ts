import { Pipe, PipeTransform } from '@angular/core';
import { Sign } from '@commonDefine/pms/sign';

@Pipe({
  name: 'isCurrentUser'
})
export class IsCurrentUserPipe implements PipeTransform {

  transform(ele: Sign,loginEmail:string, args?: any): any {
    const userSign = ele.sign_detail.filter(x => x.sign_user_email.toLowerCase() === loginEmail)
    if (!ele.result && !userSign[0].result) {
      return true;
    } else {
      return false;
    }
  }

}
