import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table"

export interface TableHeaderInfo {
    content: string
    align: 'left' | 'right' | 'center' | null
    left: boolean
    right: boolean
    width: number
    showSort?: boolean;
    sortOrder?: NzTableSortOrder | null;
    sortFn?: NzTableSortFn | null;
    showFilter?: boolean;
    filterList?: NzTableFilterList;
    filterFn?: NzTableFilterFn | null;
    key?:string
}

export interface TableInfo {
    loading: boolean
    pageTotal: number
    pageIndex: number
    pageSize: number
    scrollX?: number
    scrollY?: number
    checkedAll: boolean
}

export interface DataRules {
    placeholder: string;
    column: string;
}

export interface TableDataCheck {
    checked: boolean
}

export interface TableDataExpand {
    expand: boolean
}

export interface UserInfo {
    empno: string
    nameC: string
    nameE: string
    email: string
    roleId: string | number
}

export interface Permission {
    allowedRead: boolean;
    allowedCreate: boolean;
    allowedUpdate: boolean;
    allowedDelete: boolean;
}

export interface Tab {
    tab: string
    tabName: string
    disabled: boolean
}

export interface ErrorStatus {
  status: number
}
