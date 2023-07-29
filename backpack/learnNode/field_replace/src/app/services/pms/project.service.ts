import { Injectable } from '@angular/core';
import { ApiResponse } from '@commonDefine/pms/api-response.model';
import { Project } from '@commonDefine/pms/project';
import { UploadedProject } from '@commonDefine/pms/uploaded-project.model';
import { UpsertResponse } from '@commonDefine/upsert-response.model';
import { HttpRequestService } from './http.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private httpRequest: HttpRequestService) { }
  // 獲取User列表
  getProject(
    projectName?: string,
    divisions?: string[],
    closeProject?: boolean,
    jiraKeys?: string[],
  ): Promise<Project[]> {
    let queryCondition = '';
    if (
      projectName ||
      (divisions && divisions.length > 0) ||
      closeProject !== undefined ||
      (jiraKeys && jiraKeys.length > 0)
    ) {
      if (projectName) {
        queryCondition = `${queryCondition}&projectName=${projectName}`;
      }
      if (divisions && divisions.length > 0) {
        divisions.forEach((element) => {
          queryCondition = `${queryCondition}&division=${element}`;
        });
      }
      if (closeProject !== undefined) {
        if (closeProject)
          queryCondition = `${queryCondition}&closeProject=True`;
        else queryCondition = `${queryCondition}&closeProject=False`;
      }
      if (jiraKeys && jiraKeys.length > 0) {
        jiraKeys.forEach((element) => {
          queryCondition = `${queryCondition}&jiraKeys=${element}`;
        });
      }
    }
    const params = {
      method: 'get',
      url: '/pms_project' + (queryCondition ? `?${queryCondition}` : ''),
    };
    return this.httpRequest.doGet<Project>(params);
  }
 
 
    /**
   * 新增或更新專案
   *
   * @method public
   * @param project 專案資料
   * @return 回傳新增或更新的結果
   */
     upsertProject(
      project: UploadedProject[]
    ): Promise<UpsertResponse<UploadedProject>> {
      const params = {
        url: '/pms_project/upsert',
        data: project,
      };
      return this.httpRequest.execPost<UpsertResponse<UploadedProject>>(params);
    }

  // querygetJiraUserById(userId: number): Promise<JiraUser[]> {
  //   const params = {
  //     url: '/pms_Jira_User/' + userId,
  //   }
  //   return this.httpRequest.doGet<JiraUser>(params)
  // }

  // 添加Project
  createProject(project: Project): Promise<Project> {
    const params = {
      url: '/pms_project',
      data: project,
    };
    console.log(params);
    return this.httpRequest.execPost<Project>(params);
  }

  // 修改Project
  updateProject(id: number, project: Project): Promise<Project> {
    const params = {
      url: '/pms_project/' + id,
      data: project,
    };
    return this.httpRequest.execPut<Project>(params);
  }

  /**
   * 驗證Jira Key
   *
   * @method public
   * @param jiraKey Jira Key
   * @return 回傳驗證Jira Key的結果
   */
  validJiraKey(
    jiraKey: string
  ): Promise<ApiResponse<any>> {
    const params = {
      method: 'get',
      url: `/pms_project/validate_jira_key?jiraKey=${jiraKey}`,
    };
    //@ts-ignore
    return this.httpRequest.execGet<ApiResponse<any>>(params);
  }

  /**
   * 新增或更新專案
   *
   * @method public
   * @param project 專案資料
   * @return 回傳新增或更新的結果
   */
  // upsertProject(
  //   project: UploadedProject[]
  // ): Promise<UpsertResponse<UploadedProject>> {
  //   const params = {
  //     url: '/pms_project/upsert',
  //     data: project,
  //   };
  //   return this.httpRequest.execPost<UpsertResponse<UploadedProject>>(params);
  // }

  // 修改Project Create Jira Status
  updateProjectJiraSatus(
    id: number,
    createResult: number,
    jiraKey: string,
    rmark: string
  ): Promise<any> {
    const params = {
      url: '/pms_project/update_create_result?id=' + id,
      data: {
        create_result: createResult,
        jira_key: jiraKey,
        remark: rmark,
      },
    };
    console.log(params);
    return this.httpRequest.doPost<any>(params);
  }

  // // 刪除指定User數據
  // deleteUserById(id: number): Promise<JiraUser[]> {
  //   const params = {
  //     url: '/pms_Jira_User/' + id,
  //   }
  //   return this.httpRequest.doDelete<JiraUser>(params)
  // }
}
