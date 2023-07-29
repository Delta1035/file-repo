import { TableDataCheck, TableDataExpand } from "./common.define"

export interface SupervisorExpand {
    divId: number
    chineseName: string
    englishName: string
    email: string
}

export interface DeptExpand {
    divId: number
    div: string
    deptFrom: string
    deptTo: string
}

export interface DivDept extends TableDataCheck, TableDataExpand {
    id: number
    div: string
    divCode: string
    function: string
    rate: string
    supervisorExpand: SupervisorExpand[]
    deptExpand: DeptExpand[]
}
