
import { TableDataCheck, TableDataExpand } from 'src/app/define/common.define';

export interface BudgetExpandData {
    resource: string
    janBudget: number
    febBudget: number
    marBudget: number
    aprBudget: number
    mayBudget: number
    junBudget: number
    julBudget: number
    augBudget: number
    sepBudget: number
    octBudget: number
    novBudget: number
    decBudget: number
}

export interface BudgetInfo extends TableDataCheck, TableDataExpand {
    id: number
    year: string
    projectName: string
    itPm: string
    bizOwner: string
    contactWindow: string
    bu: string
    bg: string
    bo: string
    customer: string
    site: string
    planStart: string
    planFinish: string
    recvEpCode: string
    recvChargeDept: string
    projectCategory: string
    projectType: string
    misHandleDiv: string
    comments: string
    cancelled: boolean
    prfStatus: number
    budgetSystemRecvChargeDept: string
    expandData: BudgetExpandData[]
}


