/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 上傳專案版本控制轉接器
 * @CREATE Thursday, 10th March 2022 2:17:46 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { UploadedVersion } from "@commonDefine/pms/uploaded-version.model";



/**
 * 上傳專案版本控制轉接器
 */
export class UploadedVersionAdapter implements UploadedVersion {
  /**
   * 版本庫所屬專案名稱
   */
  project = '';
  /**
   * 版本控制庫
   */
  version_control = '';
  /**
   * 程式碼URL
   */
  repo_url = '';
  /**
   * 程式類別
   */
  type = '';
  /**
   * 程式碼庫編號
   */
  repo_id?: number;
  /**
   * UT 名稱
   */
  ut_job_name?: string;

  /**
   * @param version 上傳專案版本控制資料
   */
  constructor(version: any) {
    this.project = version['Project'];
    this.version_control = version['程式碼控制'];
    this.repo_url = version['程式碼URL'];
    this.type = version['程式類別'];
    this.repo_id = version['程式碼庫編號'];
    this.ut_job_name = version['UT 名稱'];
  }
}
