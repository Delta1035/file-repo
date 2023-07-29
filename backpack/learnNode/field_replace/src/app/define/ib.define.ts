import { TableDataCheck, TableDataExpand } from "./common.define"


export interface IBExpandData {
    div: string
    janPlan: number
    febPlan: number
    marPlan: number
    aprPlan: number
    mayPlan: number
    junPlan: number
    julPlan: number
    augPlan: number
    sepPlan: number
    octPlan: number
    novPlan: number
    decPlan: number
}

export interface IBInfo extends TableDataCheck, TableDataExpand {
    id: number
    year: string
    projectName: string
    itPm: string
    planStart: string
    planFinish: string
    totalPlanMm: string
    pmcsIbProjectName: string
    misIbCode: string
    pmcsEpProjectName: string
    misEpCode: string
    misHandleDiv: string
    comments: string
    cancelled: boolean
    expandData: IBExpandData[]
}


