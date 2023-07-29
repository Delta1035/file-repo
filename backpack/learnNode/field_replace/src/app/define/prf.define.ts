import { TableDataCheck, TableDataExpand } from "./common.define"


export interface PRFExpandData {
    div: string
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

export interface PRFInfo extends TableDataCheck, TableDataExpand {
    id: number
    year: string
    projectName: string
    itPm: string
    bizOwner: string
    contactWindow: string
    bo: string
    bg: string
    bu: string
    customer: string
    site: string
    planStart: string
    planFinish: string
    recvEpCode: string
    recvChargeDept: string
    projectCategory: string
    projectType: string
    misHandleDiv: string
    projectNameMerged: string
    misEpCode: string
    pmcsEpProjectNameMerged: string
    split: number
    comments: string
    cancelled: boolean
    ibStatus: number
    budgetSystemRecvChargeDept: string
    expandData: PRFExpandData[]
}


