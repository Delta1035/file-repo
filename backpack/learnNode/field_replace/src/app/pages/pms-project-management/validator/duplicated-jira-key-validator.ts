/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 重複的 Jira Key 驗證器
 * @CREATE Friday, 11th March 2022 3:23:22 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Project } from "@commonDefine/pms/project";
import { UploadedProject } from "@commonDefine/pms/uploaded-project.model";
import { Validator } from "@pages/pms-user-management/validator/validator";

/**
 * 重複的 Jira Key 驗證器
 */
export class DuplicatedJiraKeyValidator implements Validator<UploadedProject[]> {
  /**
   * @param projects PMS 註冊專案
   */
  constructor(private readonly projects: Project[]) {}

  /**
   * 驗證資料
   *
   * @method public
   * @param data 待驗證的資料
   * @return 回傳資料是否驗證失敗
   */
  validate(data: UploadedProject[]): Error | null {
    // 取出當前專案中所有的 Jira Key
    const jiraKey = this.projects.map(project => project.jira_key);

    // 保留已存在的 Jira Key
    const existJiraKeys = data
      .filter(item => jiraKey.includes(item.jira_key))
      .map(item => item.jira_key);

    if (existJiraKeys.length > 0) {
      return new Error(`Jira Key ${existJiraKeys.join(', ')} have been existed`);
    } else {
      return null;
    }
  }
}
