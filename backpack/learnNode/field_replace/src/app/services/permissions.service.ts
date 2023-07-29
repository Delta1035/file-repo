import { Injectable } from '@angular/core';
import { Permission, UserInfo } from '../define/common.define';
import { IpmApiService } from './ipm-api.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  // 当前的登录者在所有页面的权限
  allPermissions: any[] = [];

  userInfo: UserInfo = {
    empno: '',
    nameC: '',
    nameE: '',
    email: '',
    roleId: '',
  };

  constructor(public ipmApiService: IpmApiService) { }

  /**
   * @description: 获取当前登录者的信息
   * @return Promise<void>
   */
  getUserPermissions(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.ipmApiService.getUserInfo().subscribe(
        (resp: any) => {
          // console.log(resp);
          this.userInfo.empno = resp.id;
          this.userInfo.nameC = resp.chineseName;
          this.userInfo.nameE = resp.englishName;
          this.userInfo.email = resp.email;
          this.userInfo.roleId = resp.roleId;
          this.allPermissions = resp.pageInfo;
          resolve();
        },
        (error) => {
          reject();
        }
      );
    });
  }

  /**
   * @description: 获取当前登录者在某个页面的权限
   * @param pageId: 页面id
   * @return Permission
   */
  getPagePermissions(pageId: string): Permission {
    const permission = this.allPermissions.find(
      (item) => item.pageId === this.getPageId(pageId)
    );
    return {
      allowedRead: Boolean(permission.allowedRead),
      allowedCreate: Boolean(permission.allowedCreate),
      allowedUpdate: Boolean(permission.allowedUpdate),
      allowedDelete: Boolean(permission.allowedDelete),
    };
  }

  /**
   * @description: 获取当前登录者在多个页面的联合查看权限
   * @param pageId: 页面id
   * @return Permission
   */
  getPageShowPermission(pageIdList: string[]): boolean {
    const permissionList: Permission[] = [];
    pageIdList.forEach((pageId: string) => {
      const permission: Permission | undefined = this.allPermissions.find(
        (iter) => iter.pageId === this.getPageId(pageId)
      );
      if (permission) {
        permissionList.push(permission)
      } else {
        console.log(pageId);
      }
    })
    return permissionList.findIndex(item => item.allowedRead) > -1;
  }

  /**
   * @description: 通过前端的页面id，转换成后端定义的页面id
   * @param pageId: 页面id
   * @return string
   */
  private getPageId(pageId: string): string {
    let result: string = '';
    switch (pageId) {
      // Budget
      case 'budgetMaintain':
        result = 'BUDGET_MAINTAIN';
        break;
      case 'budgetPRF':
        result = 'BUDGET_PRF_MAINTAIN';
        break;
      // TSS
      case 'tssMaintain':
        result = 'TSS_IBCODE_MAINTAIN';
        break;
      case 'tssReport':
        result = 'TSS_Report';
        break;
      // Month-end Process
      case 'mepSteps':
        result = 'MONTH_END_PROCESS';
        break;
      case 'mepPAJMaintainPAJChargeManMonth':
        result = 'MONTH_END_PROCESS_MAINTAIN_PAJ-CHARGE_MANMONTH';
        break;
      case 'mepPAJTrackingReport':
        result = 'MONTH_END_PROCESS_MAINTAIN_PAJ-TRACKING_REPORT';
        break;
      case 'mepBUWiwynnPAJ':
        result = 'MONTH_END_PROCESS_MAINTAIN_PAJ-BU_WIWYNN';
        break;
      case 'mepExternalNameMaintain':
        result = 'MONTH_END_PROCESS_EXTERNAL_NAME';
        break;
      // PAJ
      case 'pajUploadTSS':
        result = 'PAJ_UPLOAD_TSS';
        break;
      // Report
      case 'reportChecking':
        result = 'REPORT';
        break;
      // basicData
      case 'basicDataOrganization':
        result = 'ENTERPRISE_MAIN';
        break;
      case 'basicDataTssCal':
        result = 'SYSTEM_CAL';
        break;
      case 'basicDataResourceGroup':
        result = 'SYSTEM_RESOURCE';
        break;
      case 'basicDataDivDept':
        result = 'SYSTEM_DIV_DEPT';
        break;
      // maintain
      case 'maintainPerson':
        result = 'SYSTEM_PERSON';
        break;
      case 'maintainRole':
        result = 'SYSTEM_ROLE';
        break;
      default:
        break;
    }
    return result;
  }
}
