import { TableDataCheck } from 'src/app/define/common.define';

export interface UnkownName extends TableDataCheck {
    id: number
    pmcsIbProjectName: string
    misIbCode: string
    itPm: string
    empName: string
    empId: string
    dept: string
    projectYear: string
}

export interface UnkownProject extends TableDataCheck {
    id: number
    tssProjectName: string
    misIbCode: string
    itPm: string
}

