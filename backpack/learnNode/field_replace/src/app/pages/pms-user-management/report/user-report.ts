/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 抽象使用者報表
 * @CREATE Thursday, 17th March 2022 4:40:51 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { UploadedJiraUser } from "@commonDefine/pms/uploaded-jira-user.model";


/**
 * 抽象使用者報表
 */
export interface UserReport {
  /**
   * 添加使用者資料
   *
   * @method public
   * @param users 使用者資料
   * @return 回傳物件本身
   */
  addUsers(users: UploadedJiraUser[]): this;
}
