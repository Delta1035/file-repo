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

import { UploadedProject } from "@commonDefine/pms/uploaded-project.model";
import { Validator } from "@pages/pms-user-management/validator/validator";



/**
 * Jira 已存在使用者驗證器
 */
export class POTLExistValidator implements Validator<UploadedProject[]> {
  /**
   * @param jiraUsers Jira 使用者資料
   */
  constructor() { }

  /**
   * 驗證資料
   *
   * @method public
   * @param data 待驗證的資料
   * @return 回傳資料是否驗證失敗
   */
  validate(data: UploadedProject[]): Error | null {
    // 保留不存在 Jira 中的使用者
    const unExistPOUsers = data
      .filter(item => item.user_contact.length <= 0)
      .map(item => `${item.user_contact_name})`);
    const unExistITUsers = data
      .filter(item => item.it_contact.length <= 0)
      .map(item => `${item.it_contact_name})`);

    if (unExistPOUsers.length > 0 || unExistITUsers.length > 0) {
      return new Error(`[PO: ${unExistPOUsers.join(', ')}] / [IT: ${unExistITUsers.join(', ')}] not exist!`);
    } else {
      return null;
    }
  }
}
