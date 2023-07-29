/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 專案報表資料模型
 * @CREATE Tuesday, 8th March 2022 1:40:09 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

/**
 * 專案報表資料模型
 */
export interface ProjectReport {
  /**
   * 序號
   */
  no?: string;
  /**
   * 結案不顯示
   */
  hiddenOnClose?: string;
  /**
   * IT
   */
  IT?: string;
  /**
   * 部門代碼
   */
  divisionCode: string;
  /**
   * 部門
   */
  division: string;
  /**
   * 專案名稱
   */
  projectName: string;
  /**
   * 專案版本號
   */
  version?: string;
  /**
   * 專案代碼
   */
  projectCode?: string;
  /**
   * 專案類型
   */
  projectType?: string;
  /**
   * 專案開發類型
   */
  developType?: string;
  /**
   * 專案起始日期
   */
  startDate?: string;
  /**
   * 專案預期結案日期
   */
  endDate?: string;
  /**
   * 專案實際結案日期
   */
  actualCompletedDate?: string;
  /**
   * 專案開發流程類型
   */
  developFlow: string;
  /**
   * 專案目前階段
   */
  currentPhase?: string;
  /**
   * 專案時期
   */
  period?: string;
  /**
   * 專案內部人力
   */
  internal?: string;
  /**
   * 專案協作人力
   */
  cooperation?: string;
  /**
   * 專案外部人力
   */
  outsourcing?: string;
  /**
   * 專案人數
   */
  headCount?: string;
  /**
   * 組別大小
   */
  teamSize?: string;
  /**
   * 備註
   */
  remark?: string;
  /**
   * 專案 Producti Owner
   */
  po: string;
  /**
   * 專案 Tech Leader
   */
  tl: string;
  /**
   * 專案開發人員
   */
  developer?: string;
  /**
   * 專案類型
   */
  type?: string;
  /**
   * Jira 看板 Key 值
   */
  jiraBoardKey?: string;
  /**
   * 專案前端代碼 Gitlab 項目 ID
   */
  gitlabFeId?: string;
  /**
   * 專案前端代碼 Unit Test Job 名稱
   */
  gitlabFeUtName?: string;
  /**
   * 專案後端代碼 Gitlab 項目 ID
   */
  gitlabBeId?: string;
  /**
   * 專案後端代碼 Unit Test Job 名稱
   */
  gitlabBeUtName?: string;
  /**
   * 專案所存放 Gitlab Host
   */
  gitlabHost?: string;
  /**
   * 專案所存放 Gitlab URL
   */
  gitlabUrl?: string;
  /**
   * 最後更新日期
   */
  lastMaintenanceDate?: string;
}
