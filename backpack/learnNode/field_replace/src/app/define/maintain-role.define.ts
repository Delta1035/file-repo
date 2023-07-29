export interface Role {
    roleId: string | number
    roleName: string
}

export interface Page {
    pageId: string
    pageName: string
    canRead: boolean
    canCreate: boolean
    canUpdate: boolean
    canDelete: boolean
}

export interface RolePage {
    rolePageId: number
    pageId: string
    pageName: string
    allowedRead: boolean
    allowedCreate: boolean
    allowedUpdate: boolean
    allowedDelete: boolean
}

