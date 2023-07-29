import { UserGroup } from "./user-group";
import { UserProject } from "./user-project";

export interface JiraUser {
  colorRow?: {};
  id: number;
  user_name: string;
  employee_id: string;
  email: string;
  status?: number;
  statusDescription?: string;
  create_date?: Date;
  deleted_date?: Date;
  org_role?: string;
  org_roleDescription?: string;
  jira_user_id?: string;
  jira_user_group?: UserGroup[];
  add_to_org_date?: Date;
  last_seen_in_jira?: Date;
  project_list?: UserProject[];
  projects?: string;
  division?: string;
}
