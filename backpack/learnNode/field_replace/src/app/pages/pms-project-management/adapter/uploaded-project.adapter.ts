/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 上傳專案資料轉接器
 * @CREATE Thursday, 10th March 2022 12:33:30 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { ProjectLog } from "@commonDefine/pms/project-log";
import { ProjectUser } from "@commonDefine/pms/project-user";
import { UploadedMember } from "@commonDefine/pms/uploaded-member.model";
import { UploadedProject } from "@commonDefine/pms/uploaded-project.model";
import { UploadedVersion } from "@commonDefine/pms/uploaded-version.model";
import dayjs from "dayjs";



/**
 * 專案類型對照表
 */
const PRODUCT_TYPE_MAP = {
  '產品': '["Product"]',
  '模型': '["Model"]',
  '以上皆是': '["Product", "Model"]',
};

/**
 * 上傳專案資料轉接器
 */
export class UploadedProjectAdapter implements UploadedProject {
  /**
   * 專案名稱
   */
  project_name = '';
  /**
   * 專案代碼
   */
  project_code = '';
  /**
   * 部門代碼
   */
  division = '';
  /**
   * 部門主管
   */
  division_supervisor = '';
  /**
   * 部門主管 Email
   */
  division_supervisor_email = '';
  /**
   * 開發模式
   */
  mode = '';
  /**
   * 開發模式描述
   */
  modeDescription?: string;
  /**
   * 專案類型
   */
  product_type = '';
  /**
   * 專案類型描述
   */
  product_typeDescription?: string;
  /**
   * 專案起始日期
   */
  plan_start = '';
  /**
   * 專案預期結案日期
   */
  plan_end = '';
  /**
   * Jira Key
   */
  jira_key = '';
  /**
   * Jira 專案名稱
   */
  jira_name = '';
  /**
   * 用戶 PM/PO
   */
  user_contact: ProjectUser[] = [];
  /**
   * 用戶 PM/PO 名字
   */
  user_contact_name?: string;
  /**
   * 用戶 PM/PO Email
   */
  user_contact_email?: string;
  /**
 * IT PM/Tech Leader
   */
  it_contact: ProjectUser[] = [];
  /**
  * IT PM/Tech Leader 名字
   */
  it_contact_name?: string;
  /**
* IT PM/Tech Leader Email
   */
  it_contact_email?: string;
  /**
   * 專案狀態描述
   */
  statusDescription?: string;
  /**
   * 導入 PMS
   */
  involve_pms = false;
  /**
   * 導入 PMS 開始時間
   */
  involve_pms_start?: string;
  /**
   * 導入 PMS 結束時間
   */
  involve_pms_end?: string;
  /**
   * 傳案創建時間
   */
  create_date?: Date;
  /**
   * 是否結案
   */
  close?: boolean;
  /**
   * 結案時間
   */
  close_date?: Date;
  /**
   * 同意時間
   */
  approve_date?: Date;
  /**
   * 版本控制資訊
   */
  version_control?: UploadedVersion[];
  /**
   * 使用者資訊
   */
  users?: UploadedMember[];
  /**
   * 更新日誌
   */
  logs?: ProjectLog[];
  /**
   * 激活的使用者人數
   */
  active_users?: number;

  /**
   * @param project 專案資料
   */
  constructor(project: any) {
    this.project_name = project['Project Name'];
    this.project_code = project['專案代碼'];
    this.division = project['Dept.'];
    this.division_supervisor = project['Dept. Supervisor'];
    this.division_supervisor_email = project['Dept. Supervisor Email'];
    this.mode = project['Develop Flow'];
    // @ts-ignore
    this.product_type = PRODUCT_TYPE_MAP[project['Type']];
    this.plan_start = dayjs(project['專案起始日期']).format('YYYY-MM-DD');
    this.plan_end = dayjs(project['專案預期結案日期']).format('YYYY-MM-DD');
    this.jira_key = project['Jira Key'];
    this.jira_name = project['Jira 專案名稱'];
    this.user_contact_name = project['用戶 PM/PO'];
    if (project['po_data'] && project['po_data'].length > 0) {
      this.user_contact = [
        {
          id: 0,
          user_id: project['po_data'][0].user_id,
          project_id: 0,
          user_name: project['po_data'][0].user_name,
          employee_id: project['po_data'][0].employee_id,
          email: project['po_data'][0].email,
        }
      ];
    }
    this.it_contact_name = project['IT PM/Tech Leader'];
    if (project['tl_data'] && project['tl_data'].length > 0) {
      this.it_contact = [
        {
          id: 0,
          user_id: project['tl_data'][0].user_id,
          project_id: 0,
          user_name: project['tl_data'][0].user_name,
          employee_id: project['tl_data'][0].employee_id,
          email: project['tl_data'][0].email,
        }
      ];
    }
    this.involve_pms = project['導入 PMS'] === 'Y' ? true : false;
    this.involve_pms_start = project['導入 PMS 開始時間']
      ? dayjs(project['導入 PMS 開始時間']).format('YYYY-MM-DD')
      : undefined;
    this.involve_pms_end = project['導入 PMS 結束時間']
      ? dayjs(project['導入 PMS 結束時間']).format('YYYY-MM-DD')
      : undefined;
  }
}
