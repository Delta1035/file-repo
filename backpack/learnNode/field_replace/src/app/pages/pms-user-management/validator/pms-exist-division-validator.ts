/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： PMS 已存在處級驗證器
 * @CREATE Tuesday, 22nd March 2022 4:56:44 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ImpDivision } from "@commonDefine/imp-division.model";
import { UploadedJiraUser } from "@commonDefine/pms/uploaded-jira-user.model";
import { Validator } from "./validator";


/**
 * PMS 已存在處級驗證器
 */
export class PmsExistDivisionValidator implements Validator<UploadedJiraUser[]> {
  /**
   * @param division 處級資料
   */
  constructor(private readonly division: ImpDivision[]) {}

  /**
   * 驗證資料
   *
   * @method public
   * @param data 待驗證的資料
   * @return 回傳資料是否驗證失敗
   */
  validate(data: UploadedJiraUser[]): Error | null {
    const division = this.division.map(item => item.div);

    const unExistDivision: string[] = data
      .filter((item) => item.division !== undefined && item.division !== null)
      .map((item) => item.division as string)
      .filter((div) => !division.includes(div));

    return unExistDivision.length > 0
      ? new Error(`Division ${unExistDivision[0]} not exist`)
      : null;
  }
}

