/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 使用者上傳資料建構者
 * @CREATE Thursday, 17th March 2022 4:43:30 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { UploadedJiraUser } from "@commonDefine/pms/uploaded-jira-user.model";
import { UserReport } from "../report";
import { DataBuilder } from "./data.builder";

/**
 * 使用者上傳資料建構者
 */
export class UploadedUserBuilder
  implements UserReport, DataBuilder<UploadedJiraUser[]>
{
  /**
   * 使用者資料
   */
  private users: UploadedJiraUser[] = [];

  /**
   * 添加使用者資料
   *
   * @method public
   * @param users 使用者資料
   * @return 回傳物件本身
   */
  addUsers(users: UploadedJiraUser[]): this {
    this.users = users;
    return this;
  }

  /**
   * 建構資料
   *
   * @method public
   * @return 回傳建構後的資料
   */
  build(): UploadedJiraUser[] {
    return this.users;
  }
}
