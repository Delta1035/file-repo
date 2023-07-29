import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '@commonDefine/pms/project';
import { PermissionsService } from '@commonService/permissions.service';

@Pipe({
  name: 'checkOperateIcon'
})
export class CheckOperateIconPipe implements PipeTransform {

  constructor(
    private permission:PermissionsService
  ){}

  transform(mode: number, ele: Project): boolean {
    const empno = this.permission.userInfo.empno;
    const roleId = this.permission.userInfo.roleId;
    if (mode === 0)
      return (ele.status === 0 || ele.status === 3 || ele.status === 6)
        && empno === ele.create_user;
    else if (mode === 1)
      return !ele.close && (ele.status === 4 && roleId === 12/**PMS-Admin */);
    else if (mode === 2)
      return !ele.close && (ele.status === 5 && roleId === 12/**PMS-Admin */);
    else if (mode === 3)
      return !ele.close && (ele.status === 0 && empno === ele.create_user);
    else
      return false;
  }

}
