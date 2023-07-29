/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 專案報表轉接器
 * @CREATE Tuesday, 8th March 2022 2:22:53 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ProjectReport } from '@commonDefine/pms/model/project-report.model';
import { Project } from '@commonDefine/pms/project';
import dayjs from 'dayjs';

/**
 * 專案報表轉接器
 */
export class ProjectReportAdapter implements ProjectReport {
  /**
   * 序號
   */
  no = '';
  /**
   * 結案不顯示
   */
  hiddenOnClose = '';
  /**
   * IT
   */
  IT = 'IT';
  /**
   * 部門代碼
   */
  divisionCode = '';
  /**
   * 部門
   */
  division = '';
  /**
   * 專案名稱
   */
  projectName = '';
  /**
   * 專案版本號
   */
  version = '';
  /**
   * 專案代碼
   */
  projectCode = '';
  /**
   * 專案類型
   */
  projectType = '';
  /**
   * 專案開發類型
   */
  developType = '';
  /**
   * 專案起始日期
   */
  startDate = '';
  /**
   * 專案預期結案日期
   */
  endDate = '';
  /**
   * 專案實際結案日期
   */
  actualCompletedDate = '';
  /**
   * 專案開發流程類型
   */
  developFlow = '';
  /**
   * 專案目前階段
   */
  currentPhase = '';
  /**
   * 專案時期
   */
  period = '';
  /**
   * 專案內部人力
   */
  internal = '';
  /**
   * 專案協作人力
   */
  cooperation = '';
  /**
   * 專案外部人力
   */
  outsourcing = '';
  /**
   * 專案人數
   */
  headCount = '';
  /**
   * 組別大小
   */
  teamSize = '';
  /**
   * 備註
   */
  remark = '';
  /**
   * 專案 Producti Owner
   */
  po = '';
  /**
   * 專案 Tech Leader
   */
  tl = '';
  /**
   * 專案開發人員
   */
  developer = '';
  /**
   * 專案類型
   */
  type = '';
  /**
   * Jira 看板 Key 值
   */
  jiraBoardKey = '';
  /**
   * 專案前端代碼 Gitlab 項目 ID
   */
  gitlabFeId = '';
  /**
   * 專案前端代碼 Unit Test Job 名稱
   */
  gitlabFeUtName = '';
  /**
   * 專案後端代碼 Gitlab 項目 ID
   */
  gitlabBeId = '';
  /**
   * 專案後端代碼 Unit Test Job 名稱
   */
  gitlabBeUtName = '';
  /**
   * 專案所存放 Gitlab Host
   */
  gitlabHost = '';
  /**
   * 專案所存放 Gitlab URL
   */
  gitlabUrl = '';
  /**
   * 最後更新日期
   */
  lastMaintenanceDate = '';

  /**
   * @param project PMS 專案資料
   */
  constructor(project: Project) {
    const FE = ['ui', 'frontend'];
    const BE = ['api', 'job', 'backend'];
    const gitlabDomainRegExp =
      /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/g;

    this.hiddenOnClose = project.close?.toString().toUpperCase() || '';
    this.divisionCode = (project.division.match(/[0-9a-zA-Z]{3}/g) || [''])[0];
    this.division = project.division;
    this.projectName = project.project_name;
    this.projectCode = project.project_code;
    this.startDate = project.plan_start;
    this.endDate = project.plan_end;
    this.actualCompletedDate = project.close_date
      ? dayjs(project.close_date).format('YYYY/MM/DD')
      : '';
    this.developFlow = project.mode;
    this.po =
      project.users?.find((i) => i.project_role === 'po')?.user_name || '';
    this.tl =
      project.users?.find((i) => i.project_role === 'tl')?.user_name || '';
    this.type = (JSON.parse(project.product_type) as string[])
      .map((item) => (item === 'Product' ? '產品' : item))
      .map((item) => (item === 'Model' ? '模型' : item))
      .join(',');
    this.jiraBoardKey = project.jira_key;
    this.gitlabFeId = (project.version_control || [])
      .map((item) => ({ ...item, type: item.type.toLowerCase() }))
      .filter((item) => FE.includes(item.type))
      .map((item) => item.repo_id)
      .join('\n');
    this.gitlabFeUtName = (project.version_control || [])
      .map((item) => ({ ...item, type: item.type.toLowerCase() }))
      .filter((item) => FE.includes(item.type))
      .map((item) => item.ut_job_name)
      .join('\n');
    this.gitlabBeId = (project.version_control || [])
      .map((item) => ({ ...item, type: item.type.toLowerCase() }))
      .filter((item) => BE.includes(item.type))
      .map((item) => item.repo_id)
      .join('\n');
    this.gitlabBeUtName = (project.version_control || [])
      .map((item) => ({ ...item, type: item.type.toLowerCase() }))
      .filter((item) => BE.includes(item.type))
      .map((item) => item.ut_job_name)
      .join('\n');
    this.gitlabHost = Array.from(
      new Set((project.version_control || [])
        .map((item) => (item.repo_url.match(gitlabDomainRegExp) || [''])[0])
        .map((item) => item.replace(/https?:\/\//g, ''))
      )
    ).join('\n');
    this.gitlabUrl = (project.version_control || [])
      .map((item) => ({ ...item, type: item.type.toLowerCase() }))
      .map((i) => (FE.includes(i.type) ? { ...i, type: 'FE' } : i))
      .map((i) => (BE.includes(i.type) ? { ...i, type: 'BE' } : i))
      .sort((a, b) => b.type.localeCompare(a.type))
      .map((i) => `${i.type}: ${i.repo_url}`)
      .join('\n');
    this.lastMaintenanceDate = (project.logs || [])[0]?.trn_date
      ? dayjs((project.logs || [])[0]?.trn_date).format('YYYY/MM/DD')
      : '';
  }
}
