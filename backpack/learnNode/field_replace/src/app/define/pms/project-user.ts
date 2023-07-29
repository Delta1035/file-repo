export interface ProjectUser {
  colorRow?: {};
  id: number;
  project_id: number;
  user_id: number;
  user_name: string;
  employee_id: string;
  email: string;
  project_role?: string;
  project_roleDescription?: string;
  jira_role?: string;
  jira_roleDescription?: string;
  jira_user_id?: string;
  join_date?: Date;
  action?: string;
  trn_date?: Date;
  trn_user?: string;
}
