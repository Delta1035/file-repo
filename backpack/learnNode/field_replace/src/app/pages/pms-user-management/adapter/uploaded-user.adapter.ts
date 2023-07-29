
import { UploadedJiraUser } from "@commonDefine/pms/uploaded-jira-user.model";


/**
 * 上傳使用者資料轉接器
 */
export class UploadedUserAdapter implements UploadedJiraUser {
  /**
   * 使用者名稱
   */
  user_name = '';
  /**
   * 使用者工號
   */
  employee_id = '';
  /**
   * 使用者 Email
   */
  email = '';
  /**
   * 組織角色
   */
  org_role?: string;
  /**
   * 處級
   */
  division?: string;

  /**
   * @param user 使用者資料
   */
  constructor(user: {[propName:string]:any}) {
    this.user_name = user['用戶名稱'];
    this.employee_id = user['工號'];
    this.email = user['電子信箱'];
    // this.org_role = user['組織角色'];
    this.division = user['處級'];
  }
}
