import { Injectable } from '@angular/core';
import { UserInJira } from '@commonDefine/pms/user-in-jira.model';
import { UserProjectDivision } from '@commonDefine/pms/user-project-division.model';
import { HttpRequestService } from './http.service';

@Injectable({ providedIn: 'root' })
export class ReportService {
  constructor(private httpRequest: HttpRequestService) { }
  // 獲取User列表
  getUserInJira(
    projectName?: string,
    userName?: string,
    notIncludeRole?: string[],
  ): Promise<UserInJira[]> {
    let queryCondition = '';
    if (
      projectName ||
      userName ||
      (notIncludeRole && notIncludeRole.length > 0)
    ) {
      if (projectName) {
        queryCondition = `${queryCondition}&projectName=${projectName}`;
      }
      if (userName) {
        queryCondition = `${queryCondition}&userName=${userName}`;
      }
      if (notIncludeRole && notIncludeRole.length > 0) {
        notIncludeRole.forEach((element) => {
          queryCondition = `${queryCondition}&notIncludeRole=${element}`;
        });
      }
    }
    const params = {
      method: 'get',
      url: '/v_pms_user_in_jira' + (queryCondition ? `?${queryCondition}` : ''),
    };
    return this.httpRequest.doGet<UserInJira>(params);
  }

  // 獲取USER 專案對應報表
  getUserProject(
    fromDate?: string,
    toDate?: string,
    division?: string,
  ): Promise<UserProjectDivision[]> {
    let queryCondition = '';
    if (
      fromDate ||
      toDate ||
      division
    ) {
      if (fromDate) {
        queryCondition = `${queryCondition}&fromDate=${fromDate}`;
      }
      if (toDate) {
        queryCondition = `${queryCondition}&toDate=${toDate}`;
      }
      if (division) {
        queryCondition = `${queryCondition}&division=${division}`;
      }
    }
    const params = {
      method: 'get',
      url: '/v_pms_user_project_division' + (queryCondition ? `?${queryCondition}` : ''),
    };
    return this.httpRequest.doGet<UserProjectDivision>(params);
  }
}
