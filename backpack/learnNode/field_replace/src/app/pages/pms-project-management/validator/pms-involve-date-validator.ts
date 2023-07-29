/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： PMS 導入時間驗證器
 * @CREATE Friday, 11th March 2022 10:00:10 am
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { UploadedProject } from "@commonDefine/pms/uploaded-project.model";
import { Validator } from "@pages/pms-user-management/validator/validator";



/**
 * PMS 導入時間驗證器
 */
export class PmsInvolveDateValidator implements Validator<UploadedProject[]> {
  /**
   * 驗證資料
   *
   * @method public
   * @param data 待驗證的資料
   * @return 回傳資料是否驗證失敗
   */
  validate(data: UploadedProject[]): Error | null {
    // 驗證導入 PMS 起訖時間
    const isExistPmsDate = data
      .filter((item) => item.involve_pms)
      .every((item) => item.involve_pms_start && item.involve_pms_end);

    if (isExistPmsDate) {
      return null
    } else {
      return new Error('Involve PMS but missing PMS involve date');
    }
  }
}
