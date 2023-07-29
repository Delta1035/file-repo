import { Project } from "./project";
import { ProjectUser } from "./project-user";

export interface Sign {
  colorRow?: {};
  id: number;
  project: Project[];
  sign_id: string;
  result: string;
  resultDescription?: string;
  requester_remark: string;
  create_date?: Date;
  signed_date?:Date;
  update_users: ProjectUser[];
  sign_detail: SignDetail[];
  project_name?: string;
  plan_start?: string;
  plan_end?: string;
  user_contact_name?: string;
  it_contact_name?: string;
}

export interface SignDetail {
  colorRow?: {};
  id: number;
  detail_seq: number;
  sign_user: string;
  sign_user_email: string;
  result: string;
  remark: string;
  signed_date?:Date;
}

