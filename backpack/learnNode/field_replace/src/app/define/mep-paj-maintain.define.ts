import { TableDataCheck, TableDataExpand } from "./common.define"


export interface PlannedIBExpandData {
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

export interface ActualTSSExpandData {
    div: string
    jantss: number
    febtss: number
    martss: number
    aprtss: number
    maytss: number
    juntss: number
    jultss: number
    augtss: number
    septss: number
    octtss: number
    novtss: number
    dectss: number
}

export interface ToChargePAJExpandData {
    id: number
    div: string
    janPaj: number
    febPaj: number
    marPaj: number
    aprPaj: number
    mayPaj: number
    junPaj: number
    julPaj: number
    augPaj: number
    sepPaj: number
    octPaj: number
    novPaj: number
    decPaj: number
}

export interface PAJCharge extends TableDataCheck, TableDataExpand {
    id: number
    year: string
    projectName: string
    itPm: string
    planStart: string
    planFinish: string
    pmcsIbProjectName: string
    misIbCode: string
    pmcsEpProjectName: string
    misEpCode: string
    misHandleDiv: string
    cancelled: boolean
    completed: boolean
    monthlyPajManMonthsUpdated: boolean
    monthlyPajDone: boolean
    plannedIBData: PlannedIBExpandData[]
    actualTSSData: ActualTSSExpandData[]
    toChargePAJData: ToChargePAJExpandData[]
}


export interface TrackingReport extends TableDataCheck {
    id: number
    year: string
    projectName: string
    itPm: string
    pmcsIbProjectName: string
    misIbCode: string
    cancelled: boolean
    completed: boolean
    monthlyPajDone: boolean
    recvChargeDept: string
    bo: string
}


