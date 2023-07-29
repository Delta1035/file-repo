// menu折叠菜单数据
export const menusList = [
  {
    title: 'Base Data',
    icon: 'database',
    i18:'menu.MAINITEM.BASEDATA' ,
    authIdentify : ['baseData', 'query'],
    children: [
      {
        name: 'BO',
        path: 'basedata/bo',
        i18:'menu.SUBITEM.BO',
        authIdentify : ['baseData', 'query']
      },
      {
        name: 'BG',
        path: 'basedata/bg',
        i18:'menu.SUBITEM.BG',
        authIdentify : ['baseData', 'query']
      },
      {
        name: 'BU',
        path: 'basedata/bu',
        i18:'menu.SUBITEM.BU',
        authIdentify : ['baseData', 'query']
      },
      {
        name: 'Division',
        path: 'basedata/division',
        i18: 'menu.SUBITEM.DIVISION',
        authIdentify : ['baseData', 'query']
      },
      {
        name: 'Department',
        path: 'basedata/department',
        i18: 'menu.SUBITEM.DEPARTMENT',
        authIdentify : ['baseData', 'query']
      },
      {
        name: 'Tss ext-names',
        path: 'basedata/tss-ext-names',
        i18: 'menu.SUBITEM.TSSEXTNAMES',
        authIdentify : ['baseData', 'query']
      },
      {
        name: 'Tss data',
        path: 'basedata/tss-data',
        i18: 'menu.SUBITEM.TSSDATA',
        authIdentify : ['baseData', 'query']
      },
      {
        name: 'Tss work days',
        path: 'basedata/tss-work-days',
        i18: 'menu.SUBITEM.TSSWORKDAYS',
        authIdentify : ['baseData', 'query']
      },
      {
        name: 'Project Type',
        path: 'basedata/project-type',
        i18: 'menu.SUBITEM.PROJECTTYPE',
        authIdentify : ['baseData', 'query']
      },
      {
        name: 'Project Category',
        path: 'basedata/project-category',
        i18: 'menu.SUBITEM.PROJECTCATEGORY',
        authIdentify : ['baseData', 'query']
      },
      {
        name: 'Resource Group',
        path: 'basedata/resource-group',
        i18: 'menu.SUBITEM.RESOURCEGROUP',
        authIdentify : ['baseData', 'query']
      },
    ],
  },
  {
    title: 'Budget Project',
    icon: 'dollar',
    i18:'menu.MAINITEM.PROJECTBUDGET' ,
    authIdentify : ['projectList', 'query'],
    children: [
      {
        name: 'Man Month',
        path: 'budget-project/man-month',
        i18: 'menu.SUBITEM.MANMONTH',
        authIdentify : ['projectList', 'query']
      },
      {
        name: 'Upload Excel',
        path: 'budget-project/upload-excel',
        i18: 'menu.SUBITEM.UPLOADEXCEL',
        authIdentify : ['projectList', 'upload']
      },
    ],
  },
  {
    title: 'Monthly End Maintain',
    icon: 'calendar',
    i18:'menu.MAINITEM.MONTHLYEND' ,
    authIdentify : ['pajmonthly', 'query'],
    children: [
      {
        name: 'Man Month',
        path: 'monthly/monthly-end',
        i18: 'menu.SUBITEM.MONTHLYEND',
        authIdentify : ['pajmonthly', 'query']
      },
    ],
  },
  {
    title: 'PRF',
    icon: 'audit',
    i18:'menu.MAINITEM.PRF' ,
    authIdentify : ['prf', 'query'],
    children: [
      {
        name: 'PRF Maint',
        path: 'prf/prf-maint',
        i18: 'menu.SUBITEM.PRFMAINT',
        authIdentify : ['prf', 'query']
      },
      {
        name: 'Upload Excel',
        path: 'prf/upload-excel',
        i18: 'menu.SUBITEM.UPLOADEXCEL',
        authIdentify : ['prf', 'hiden']
      },
    ],
  },
  {
    title: 'IB',
    icon: 'container',
    i18:'menu.MAINITEM.IB' ,
    authIdentify : ['ib', 'query'],
    children: [
      {
        name: 'IB Maint',
        path: 'ib/ib-maint',
        i18: 'menu.SUBITEM.IBMAINT',
        authIdentify : ['ib', 'query']
      }
    ],
  },
  {
    title: 'PMS',
    icon: 'fund-projection-screen',
    i18:'menu.MAINITEM.PMS' ,
    authIdentify : ['pms', 'query'],
    children: [
      {
        name: 'PMS Process',
        path: 'pms/pms-process',
        i18: 'menu.SUBITEM.PMSPROCESS',
        authIdentify : ['pms', 'new']
      },
      {
        name: 'PMS SOP',
        path: 'pms/pms-sop',
        i18: 'menu.SUBITEM.PMSSOP',
        authIdentify : ['pms', 'new']
      },
      {
        name: 'Add Jira User',
        path: 'pms/add-jira-user',
        i18: 'menu.SUBITEM.ADDJIRAUSER',
        authIdentify : ['pms', 'new']
      },
      {
        name: 'Add Project',
        path: 'pms/add-project',
        i18: 'menu.SUBITEM.PROJECTMANAGEMENT',
        authIdentify : ['pms', 'new']
      },
      {
        name: 'Waiting For Approve',
        path: 'pms/waiting-for-approve',
        i18: 'menu.SUBITEM.WAITINGFORAPPROVE',
        authIdentify : ['pms', 'new']
      },
      {
        name: 'User Project Status Report',
        path: 'pms/user-project-status-report',
        i18: 'menu.SUBITEM.USERPROJECTSTATUSREPORT',
        authIdentify : ['pms', 'new']
      },
      {
        name: 'User Project Division Report',
        path: 'pms/user-project-division-report',
        i18: 'menu.SUBITEM.USERPROJECTDIVISIONREPORT',
        authIdentify : ['pms', 'new']
      },
    ],
  },
  {
    title: 'PAJ',
    icon: 'audit',
    i18:'menu.MAINITEM.PAJ' ,
    authIdentify : ['paj', 'query'],
    children: [
      {
        name: 'Line Maintain',
        path: 'paj/line-maint',
        i18: 'menu.SUBITEM.PAJLINE',
        authIdentify : ['paj', 'query']
      },
      {
        name: 'PAJ Maintain',
        path: 'paj/paj-maint',
        i18: 'menu.SUBITEM.PAJACT',
        authIdentify : ['paj', 'query']
      },
      {
        name: 'Actaul Confirm Report',
        path: 'paj/actual-confirm-report',
        i18: 'menu.SUBITEM.ACTUALCONFIRMREPORT',
        authIdentify : ['paj', 'report']
      },
    ],
  },
  {
    title: 'Check Report',
    icon: 'schedule',
    i18:'menu.MAINITEM.CHECKMAINT' ,
    authIdentify : ['check', 'query'],
    children: [
      {
        name: 'Check Report',
        path: 'check/check-maint',
        i18: 'menu.SUBITEM.CHECKMAINT',
        authIdentify : ['check', 'query']
      }
    ],
  },
];

export interface mainMenu {
  title: string;
  icon: string;
  i18: string;
  authIdentify: [string, string];
  children: subMenu[];
}

export interface subMenu {
  name: string;
  path: string;
  i18: string;
  authIdentify: [string, string];
}
