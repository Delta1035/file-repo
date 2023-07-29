export interface ProjectRepo {
  colorRow?: {};
  id: number;
  project_id: number;
  version_control: string;
  repo_url: string;
  type: string;
  repo_id?: number;
  ut_job_name?: string;
  action?: string;
}
