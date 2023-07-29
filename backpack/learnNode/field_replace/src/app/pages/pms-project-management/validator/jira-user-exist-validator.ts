/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： Jira 已存在使用者驗證器
 * @CREATE Friday, 11th March 2022 10:19:45 am
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { JiraUser } from "@commonDefine/pms/jira-user";
import { UploadedMember } from "@commonDefine/pms/uploaded-member.model";
import { UploadedProject } from "@commonDefine/pms/uploaded-project.model";
import { Validator } from "@pages/pms-user-management/validator/validator";


/**
 * Jira 已存在使用者驗證器
 */
export class JiraUserExistValidator implements Validator<UploadedProject[]> {
  /**
   * @param jiraUsers Jira 使用者資料
   */
  constructor(private readonly jiraUsers: JiraUser[]) {}

  /**
   * 驗證資料
   *
   * @method public
   * @param data 待驗證的資料
   * @return 回傳資料是否驗證失敗
   */
  validate(data: UploadedProject[]): Error | null {
    const users: UploadedMember[] = [];
    const jiraUsers = this.jiraUsers;

    // 取出專案中的所有成員
    data
      .map(item => item.users)
      .forEach((item) => item ? users.push(...item) : null);

    // 保留不存在 Jira 中的使用者
    const unExistUsers = users
      .filter((u) => jiraUsers.findIndex((j) => j.user_name?.toString().toUpperCase() === u.user_name?.toString().toUpperCase() ||
         j.employee_id?.toString().toUpperCase() === u.employee_id?.toString().toUpperCase()) < 0)
      .map(u => `${u.user_name}(${u.employee_id})`);

    if (unExistUsers && unExistUsers.length > 0) {
      return new Error(`User ${unExistUsers.join(', ')} not exist in jira`);
    } else {
      return null;
    }
  }
}
