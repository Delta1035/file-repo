/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 上傳專案版本控制資料模型
 * @CREATE Thursday, 10th March 2022 2:23:00 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ProjectRepo } from "./projectRepo";


/**
 * 上傳專案版本控制資料模型
 */
export interface UploadedVersion
  extends Omit<ProjectRepo, 'id' | 'project_id' | 'action'> {
  /**
   * 版本庫所屬專案名稱
   */
  project: string;
}
