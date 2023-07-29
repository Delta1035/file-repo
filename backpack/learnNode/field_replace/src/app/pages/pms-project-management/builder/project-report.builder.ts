/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 專案報表建構者
 * @CREATE Tuesday, 8th March 2022 2:01:47 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ProjectReport } from "@commonDefine/pms/model/project-report.model";
import { Project } from "@commonDefine/pms/project";
import { DataBuilder } from "@pages/pms-user-management/builder/data.builder";


/**
 * 專案報表建構者
 */
export class ProjectReportBuilder implements DataBuilder<ProjectReport> {
  /**
   * 專案資料
   */
  private project?: Project;

  /**
   * 添加專案資料
   *
   * @method public
   * @param project 專案資料
   * @return 回傳物件本身
   */
  addProject(project: Project): this {
    this.project = project;
    return this;
  }

  /**
   * 建構資料
   *
   * @method public
   * @return 回傳建構後的資料
   */
  build(): ProjectReport {
    return {
      divisionCode: (this.project?.division.match(/[a-zA-Z]{3}/g) || [''])[0],
      division: this.project?.division || '',
      projectName: this.project?.project_name || '',
      version: '',
      projectCode: this.project?.project_code || '',
      projectType: '',
      developType: '',
      startDate: this.project?.plan_start || '',
      endDate: this.project?.plan_end || '',
      actualCompletedDate: '',
      developFlow: this.project?.mode || '',
      currentPhase: '',
      period: '',
      internal: '',
      cooperation: '',
      outsourcing: '',
      headCount: '',
      teamSize: '',
      remark: '',
      po: '',
      tl: '',
      developer: '',
      type: '',
      jiraBoardKey: '',
      gitlabFeId: '',
      gitlabFeUtName: '',
      gitlabBeId: '',
      gitlabBeUtName: '',
      gitlabHost: '',
      gitlabUrl: '',
      lastMaintenanceDate: '',
    };
  }
}
