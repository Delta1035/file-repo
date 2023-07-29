/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 抽象專案報表
 * @CREATE Friday, 11th March 2022 9:28:51 am
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { UploadedMember } from "@commonDefine/pms/uploaded-member.model";
import { UploadedProject } from "@commonDefine/pms/uploaded-project.model";
import { UploadedVersion } from "@commonDefine/pms/uploaded-version.model";

// import { UploadedProject, UploadedVersion, UploadedMember } from "@commonModels/index";

/**
 * 抽象專案報表
 */
export interface ProjectReport {
  /**
   * 添加專案資料
   *
   * @method public
   * @param projects 專案資料
   * @return 回傳物件本身
   */
  addProject(projects: UploadedProject[]): this;

  /**
   * 添加版本資料
   *
   * @method public
   * @param versions 版本資料
   * @return 回傳物件本身
   */
  addVersion(versions: UploadedVersion[]): this;

  /**
   * 添加成員資料
   *
   * @method public
   * @param members 成員資料
   * @return 回傳物件本身
   */
  addMember(members: UploadedMember[]): this;
}
