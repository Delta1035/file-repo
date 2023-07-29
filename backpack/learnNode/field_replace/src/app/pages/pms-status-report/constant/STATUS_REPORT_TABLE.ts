import { TableHeaderInfo } from "@commonDefine/common.define";

export const STATUS_REPORT_TABLE_HEADER: TableHeaderInfo[] = [
  {
    content: '#',
    align: 'center',
    left: false,
    right: false,
    width: 100
    , key: 'index'
  },
  {
    content: 'PMS.JiraKey',
    align: 'center',
    left: false,
    right: false,
    width: 120
    , key: 'jira_key'
  },
  {
    content: 'PMS.JiraProjectId',
    align: 'center',
    left: false,
    right: false,
    width: 160
    , key: 'jira_project_id'
  },
  {
    content: 'JIRAUSER.JiraUserId',
    align: 'center',
    left: false,
    right: false,
    width: 500
    , key: 'jira_user_id'
  },
  {
    content: 'JIRAUSER.JiraUserName',
    align: 'center',
    left: false,
    right: false,
    width: 300
    , key: 'display_name'
  },
  {
    content: 'PMS.ProjectRole',
    align: 'center',
    left: false,
    right: false,
    width: 100
    , key: 'project_roleDescription'
  },
  {
    content: 'PMS.PmsJiraProjectID',
    align: 'center',
    left: false,
    right: false,
    width: 150
    , key: 'pms_project_id'
  },

  {
    content: 'PMS.UserID',
    align: 'center',
    left: false,
    right: false,
    width: 150
    , key: 'pms_user_id'
  },

  {
    content: 'PMS.Division',
    align: 'center',
    left: false,
    right: false,
    width: 100
    , key: 'division'
  },

  {
    content: 'PMS.ProjectName',
    align: 'center',
    left: false,
    right: false,
    width: 400
    , key: 'project_name'
  },

  {
    content: 'PMS.JiraName',
    align: 'center',
    left: false,
    right: false,
    width: 300
    , key: 'jira_name'
  },

  {
    content: 'PMS.UserProjectStatus',
    align: 'center',
    left: false,
    right: false,
    width: 1000
    , key: 'statusDescription'
  },
]

