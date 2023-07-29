

import { JiraUser } from "./jira-user";

/**
 * 使用者上傳資料模型
 */
export interface UploadedJiraUser extends Pick<
  JiraUser, 'user_name' | 'employee_id' | 'email' | 'division'
> {
}
