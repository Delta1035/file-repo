/**
 * 專案名稱： imp
 * 部門代號： MLD500
 * 檔案說明： 上傳專案成員資料轉接器
 * @CREATE Thursday, 10th March 2022 3:57:56 pm
 * @author Steve CY Lin
 * @contact Steve_CY_Lin@wistron.com #1342
 * -----------------------------------------------------------------------------
 * @NOTE
 */

import { UploadedMember } from "@commonDefine/pms/uploaded-member.model";


/**
 * 專案角色對照表
 */
const PORJECT_ROLE_MAP = {
  'Tech Leader': 'tl',
  'Product Owner': 'po',
  '前端工程師': 'fe',
  '後端工程師': 'be',
  'UI/UX': 'uiux',
  'Translator': 'translator',
  '其他': 'others'
};

/**
 * Jira 角色對照表
 */
const JIRA_ROLE_MAP = {
  Developer: 'developer',
  'Non Developer': 'nonDeveloper',
};

/**
 * 上傳專案成員資料轉接器
 */
export class UploadedMemberAdapter implements UploadedMember {
  /**
   * 成員所屬專案名稱
   */
  project = '';
  /**
   * 成員名稱
   */
  user_name = '';
  /**
   * 成員工號
   */
  employee_id = '';
  /**
   * 專案角色
   */
  project_role?: string;
  /**
   * Jira 角色
   */
  jira_role?: string;

  /**
   * @param member 上傳專案成員資料
   */
  constructor(member: {[props:string]:any}) {
    this.project = member['Project'];
    this.user_name = member['用戶名稱'];
    this.employee_id = member['工號'].toString();
    // @ts-ignore
    this.project_role = PORJECT_ROLE_MAP[member['專案角色']];
    // @ts-ignore
    this.jira_role = JIRA_ROLE_MAP[member['JIRA角色']];
  }
}
