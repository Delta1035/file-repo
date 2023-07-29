import { Injectable } from '@angular/core';
import { JiraUser } from '@commonDefine/pms/jira-user';
import { UploadedJiraUser } from '@commonDefine/pms/uploaded-jira-user.model';
import { UpsertResponse } from '@commonDefine/upsert-response.model';
import { HttpRequestService } from './http.service';
export type SearchJiraUserInput = {
  userName?: string;
  status?: number;
  jiraGroup?: string;
  userNames?: string[];
  email?: string;
  emails?: string[];
  employeeId?: string;
  employeeIds?: string[];
};
@Injectable({ providedIn: 'root' })
export class JiraUserService {
  constructor(private httpRequest: HttpRequestService) {}
  // 獲取User列表
  getJiraUser({
    userName,
    status,
    jiraGroup,
    userNames,
    email,
    emails,
    employeeId,
    employeeIds,
  }: SearchJiraUserInput): Promise<JiraUser[]> {
    let queryCondition = '';
    if (
      userName ||
      (userNames && userNames.length > 0) ||
      email ||
      (emails && emails.length > 0) ||
      employeeId ||
      (employeeIds && employeeIds.length > 0) ||
      (status && status !== 0) ||
      jiraGroup
    ) {
      if (userName) {
        queryCondition = `${queryCondition}&userName=${userName}`;
      }
      if (userNames && userNames.length > 0) {
        userNames.forEach((element) => {
          queryCondition = `${queryCondition}&userNameList=${element}`;
        });
      }
      if (email) {
        queryCondition = `${queryCondition}&email=${email}`;
      }
      if (emails && emails.length > 0) {
        emails.forEach((element) => {
          queryCondition = `${queryCondition}&emailList=${element}`;
        });
      }
      if (employeeId) {
        queryCondition = `${queryCondition}&employeeId=${employeeId}`;
      }
      if (employeeIds && employeeIds.length > 0) {
        employeeIds.forEach((element) => {
          queryCondition = `${queryCondition}&employeeIdList=${element}`;
        });
      }
      if (status && status !== 0) {
        queryCondition = `${queryCondition}&status=${status}`;
      }
      if (jiraGroup) {
        queryCondition = `${queryCondition}&jiraGroup=${jiraGroup}`;
      }
    }
    const params = {
      method: 'get',
      url: '/pms_Jira_User' + (queryCondition ? `?${queryCondition}` : ''),
    };
    return this.httpRequest.doGet<JiraUser>(params);
  }

  querygetJiraUserById(userId: number): Promise<JiraUser[]> {
    const params = {
      url: '/pms_Jira_User/' + userId,
    };
    return this.httpRequest.doGet<JiraUser>(params);
  }

  // 添加User
  createUser(user: JiraUser): Promise<JiraUser[]> {
    const params = {
      url: '/pms_Jira_User',
      data: user,
    };
    console.log(params);
    return this.httpRequest.doPost<JiraUser>(params);
  }

  // 修改User
  updateUser(id: number, user: JiraUser): Promise<JiraUser[]> {
    const params = {
      url: '/pms_Jira_User/' + id,
      data: user,
    };
    return this.httpRequest.doPut<JiraUser>(params);
  }

  /**
   * 新增或更新使用者
   *
   * @method public
   * @param user 使用者資料
   * @return 回傳新增或更新的結果
   */
  upsertUser(
    user: UploadedJiraUser[]
  ): Promise<UpsertResponse<UploadedJiraUser>> {
    const params = {
      url: '/pms_Jira_User/upsert',
      data: user,
    };
    return this.httpRequest.execPost<UpsertResponse<UploadedJiraUser>>(params);
  }

  // 刪除指定User數據
  deleteUserById(id: number): Promise<JiraUser[]> {
    const params = {
      url: '/pms_Jira_User/' + id,
    };
    return this.httpRequest.doDelete<JiraUser>(params);
  }
}
