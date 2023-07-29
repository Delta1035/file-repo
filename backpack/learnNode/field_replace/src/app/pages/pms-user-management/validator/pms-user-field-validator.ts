
import { UploadedJiraUser } from "@commonDefine/pms/uploaded-jira-user.model";
import { Validator } from "./validator";


/**
 * PMS 使用者欄位驗證器
 */
export class PmsUserFieldValidator implements Validator<UploadedJiraUser[]> {
  /**
   * 驗證資料
   *
   * @method public
   * @param data 待驗證的資料
   * @return 回傳資料是否驗證失敗
   */
  validate(data: UploadedJiraUser[]): Error | null {
    const isUserNameValid = data
      .map(item => item.user_name)
      .every(item => item !== undefined && item !== null && item !== '');
    const isEmployeeIdValid = data
      .map((item) => item.employee_id)
      .every((item) => item !== undefined && item !== null && item !== '');
    const isEmailValid = data
      .map((item) => item.email)
      .every((item) => item !== undefined && item !== null && item !== '');

    // 驗證必填欄位
    if (!isUserNameValid) {
      return new Error('missing required field: user_name');
    }
    if (!isEmployeeIdValid) {
      return new Error('missing required field: employee_id');
    }
    if (!isEmailValid) {
      return new Error('missing required field: email');
    }
    return null;
  }
}
