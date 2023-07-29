/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 專案上傳資料模型
 * @CREATE Thursday, 10th March 2022 2:30:16 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { Project } from "./project";
import { UploadedMember } from "./uploaded-member.model";
import { UploadedVersion } from "./uploaded-version.model";

/**
 * 專案上傳資料模型
 */
export interface UploadedProject
  extends Omit<Project, 'id' | 'status' | 'version_control' | 'users'> {
  /**
   * 版本控制資訊
   */
  version_control?: UploadedVersion[];
  /**
   * 成員資料
   */
  users?: UploadedMember[];
}
