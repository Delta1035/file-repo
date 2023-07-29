/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 上傳專案成員資料模型
 * @CREATE Thursday, 10th March 2022 3:55:17 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ProjectUser } from "./project-user";


/**
 * 上傳專案成員資料模型
 */
export interface UploadedMember
  extends Omit<
    ProjectUser,
    'id' | 'project_id' | 'user_id' | 'email' | 'action'
  > {
  /**
   * 版本庫所屬專案名稱
   */
  project: string;
}
