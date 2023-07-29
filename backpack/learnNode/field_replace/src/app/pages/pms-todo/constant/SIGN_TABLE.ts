import { TableHeaderInfo } from "@commonDefine/common.define"
import { TableCellInfo } from "@pages/pms-user-management/constant/JIRA_USER_TABLE"

export const SIGN_TABLE_HEADER: TableHeaderInfo[] = [
  {
    align:'center',
    width:50,
    content:'#',
    left:true,
    right:false,
    key:'index'
  },
  {
    width:90,
    content:'common.OPERATION',
    left:true,
    right:false,
    align:'center',
    key:'operation'

  },
  {
    width:150,
    content:'PMS.SignId',
    left:false,
    right:false,
    align:'center',
    key:'sign_id'

  },
  {
    width:150,
    content:'PMS.SignResult',
    left:false,
    right:false,
    align:'center',
    key:'result'

  },
  {
    width:200,
    content:'PMS.CreateDate',
    left:false,
    right:false,
    align:'center',
    key:'create_date'

  },
  {
    width:200,
    content:'PMS.SignedDate',
    left:false,
    right:false,
    align:'center',
    key:'signed_date'

  },
  {
    width:300,
    content:'PMS.ProjectName',
    left:false,
    right:false,
    align:'center',
    key:'project_name'


  },
  {
    width:100,
    content:'PMS.PlanStart',
    left:false,
    right:false,
    align:'center',
    key:'plan_start'

  },
  {
    content:'PMS.PlanEnd',
    left:false,
    right:false,
    align:'center',
    width:100,
    key:'plan_end'

  },
  {
    content:'PMS.UserContact',
    left:false,
    right:false,
    align:'center',
    width:200,
    key:'user_contact_name'

  },
  {
    width:200,
    content:'PMS.ITContact',
    left:false,
    right:false,
    align:'center',
    key:'it_contact_name'

  },
]
// | 'index' | 'operation'
export const SIGN_TABLE_CELL:TableCellInfo[] = [
  {
    left:true,
    right:false,
    align:'center',
    content:'index'
  },
  {
    left:true,
    right:false,
    align:'center',
    content:'operation'
  },
  {
    left:false,
    right:false,
    align:'center',
    content:'sign_id'
  },
  // {
  //   left:false,
  //   right:false,
  //   align:'center',
  //   content:'result'
  // },
  {
    left:false,
    right:false,
    align:'center',
    content:'result'
  },
  {
    left:false,
    right:false,
    align:'center',
    content:'create_date'
  },
  {
    left:false,
    right:false,
    align:'center',
    content:'signed_date'
  },
  {
    left:false,
    right:false,
    align:'center',
    content:'project_name'
  },
  {
    left:false,
    right:false,
    align:'center',
    content:'plan_start'
  },
  {
    left:false,
    right:false,
    align:'center',
    content:'plan_end'
  },
  {
    left:false,
    right:false,
    align:'center',
    content:'user_contact_name'
  },
  {
    left:false,
    right:false,
    align:'center',
    content:'it_contact_name'
  }
]
// export const JIRA_USER_TABLE_KEYS:Array<(keyof JiraUser)> = [
//   'id','user_name','employee_id','email','division','statusDescription','create_date','deleted_date','org_roleDescription','projects'
// ]

