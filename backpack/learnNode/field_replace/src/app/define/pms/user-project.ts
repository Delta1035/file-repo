export interface UserProject {
  colorRow?: {};
  id: number;
  user_id: number;
  project_id: number;
  project_name: string;
  project_role: string;
  project_roleDescription?: string;
  jira_role: string;
  jira_roleDescription: string;
  join_date?: string;
}
