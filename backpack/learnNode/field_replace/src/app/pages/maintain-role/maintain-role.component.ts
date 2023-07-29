import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { Permission, TableInfo } from 'src/app/define/common.define';
import { Role, Page, RolePage } from 'src/app/define/maintain-role.define';
import { IpmApiService } from 'src/app/services/ipm-api.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
    selector: 'app-maintain-role',
    templateUrl: './maintain-role.component.html',
    styleUrls: ['./maintain-role.component.scss']
})
export class MaintainRoleComponent implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: ElementRef | undefined;

    pagePermission: Permission = this.permissionsService.getPagePermissions('maintainRole');

    role: string | number = '';
    roleList: Role[] = [];

    pageList: Page[] = [];

    tableInfo: TableInfo = {
        loading: false,
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 8,
        checkedAll: false
    }

    rolePagesData: RolePage[] = [];

    newRoleModalData: any = {
        title: '',
        width: 1000,
        className: 'new_role_modal',
        type: '',
        show: false,
        newRoleData: {
            roleName: null,
            // { title: 'maintainRole.roleNameM', value: '', must: true, status: false, type: 'input' }
            rolePages: [],
            selectAll: {
                allowedCreate: false, allowedDelete: false,
                allowedRead: false, allowedUpdate: false
            }
        },
        canSubmit: false,
        submitLoading: false,
        onShow: () => { this.newRoleModalData.show = true },
        onCancel: () => { this.newRoleModalData.show = false }
    }

    getRoleListSubscribe: Subscription | undefined;
    getPageListSubscribe: Subscription | undefined;
    getRolePagesSubscribe: Subscription | undefined;

    constructor(
        public title: Title,
        public translate: TranslateService,
        public ipmApiService: IpmApiService,
        public utils: UtilsService,
        private modal: NzModalService,
        public permissionsService: PermissionsService,
    ) {
        this.title.setTitle(this.translate.instant('home.maintainRole') + ' - ' + this.translate.instant('title'));
    }

    ngOnInit(): void {
        this.getPagePermission();
        this.initPage();
    }

    getPagePermission() {
        // this.pagePermission = this.permissionsService.getPagePermissions('maintainRole')
    }

    initPage() {
        this.tableInfo.loading = true;
        this.role = '';
        this.roleList = [];
        const initPro = new Promise<void>((resolve, reject) => {
            this.getRoleListSubscribe = this.ipmApiService.getRoles().subscribe((resp: any) => {
                this.roleList = resp.filter((item: any) => item.id > 1).map((item: any) => {
                    return { roleId: item.id, roleName: item.name }
                });
                this.role = this.roleList[0].roleId;
                resolve();
            })
            this.getPageListSubscribe = this.ipmApiService.getPages().subscribe((resp: any) => {
                this.pageList = resp.map((item: any) => {
                    return {
                        pageId: item.id, pageName: 'home.' + this.getPageNameKey(item.id),
                        canRead: item.canRead, canCreate: item.canCreate,
                        canUpdate: item.canUpdate, canDelete: item.canDelete
                    }
                });
            })
        });
        initPro.then(data => {
            this.tableInfo.pageSize = Math.floor((this.dataTable?.nativeElement.clientHeight - 64 - 48) / 50);
            this.getTableData();
        })
    }

    getTableData() {
        this.tableInfo.loading = true;
        const limit = this.tableInfo.pageSize;
        const skip = (this.tableInfo.pageIndex - 1) * this.tableInfo.pageSize;
        this.getRolePagesSubscribe = this.ipmApiService.getRolePages({
            filter: JSON.stringify({
                where: { id: this.role },
                include: [{
                    relation: "rolePages",
                    scope: {
                        order: "pageId",
                        include: [{ relation: "page" }]
                    }
                }]
            })
        }).subscribe((resp: any) => {
            this.rolePagesData = resp[0].rolePages.map((item: any) => {
                return {
                    rolePageId: item.id,
                    pageId: item.pageId,
                    pageName: 'home.' + this.getPageNameKey(item.pageId),
                    allowedCreate: item.allowedCreate, allowedDelete: item.allowedDelete,
                    allowedRead: item.allowedRead, allowedUpdate: item.allowedUpdate,
                }
            })
            // TODO: api中响应头需要添加count总数
            this.tableInfo.pageTotal = resp.length;
            this.tableInfo.loading = false;
        });
    }

    tablePageIndexChange() {
        this.getTableData();
    }

    roleChange() {
        this.tableInfo.pageIndex = 1;
        this.getTableData();
    }

    newRoleStart(type: string) {
        this.newRoleModalData.type = type;
        if (type === 'new') {
            this.newRoleModalData.title = 'maintainRole.newRole';
            this.newRoleModalData.newRoleData.roleName = { title: 'maintainRole.roleNameM', value: '', must: true, status: false, type: 'input' };
            this.newRoleModalData.newRoleData.rolePages = this.pageList.map((item: any) => {
                return {
                    pageId: item.pageId, pageName: item.pageName,
                    canRead: item.canRead, canCreate: item.canCreate,
                    canUpdate: item.canUpdate, canDelete: item.canDelete,
                    allowedRead: true, allowedCreate: false,
                    allowedUpdate: false, allowedDelete: false
                }
            });
        } else if (type === 'edit') {
            this.newRoleModalData.title = 'maintainRole.editRole';
            this.newRoleModalData.newRoleData.roleName = {
                title: 'maintainRole.roleNameM',
                value: this.roleList.find(item => item.roleId === this.role)?.roleName,
                must: false, status: false, type: 'text'
            }
            this.newRoleModalData.newRoleData.rolePages = this.pageList.map((item: any) => {
                const targetRolePage = this.rolePagesData.find(iter => iter.pageId === item.pageId);
                return {
                    rolePageId: targetRolePage?.rolePageId,
                    pageId: item.pageId, pageName: item.pageName,
                    canRead: item.canRead, canCreate: item.canCreate,
                    canUpdate: item.canUpdate, canDelete: item.canDelete,
                    allowedRead: targetRolePage?.allowedRead, allowedCreate: targetRolePage?.allowedCreate,
                    allowedUpdate: targetRolePage?.allowedUpdate, allowedDelete: targetRolePage?.allowedDelete
                }
            });
        }
        this.newRoleCheck('allowedRead', 'canRead');
        this.newRoleCheck('allowedCreate', 'canCreate');
        this.newRoleCheck('allowedUpdate', 'canUpdate');
        this.newRoleCheck('allowedDelete', 'canDelete');
        this.newRoleCanSubmitCheck();
        this.newRoleModalData.onShow();
    }

    itemDataChange() {
        this.newRoleCanSubmitCheck();
    }

    newRoleCheckAll(item: string, canItem: string) {
        this.newRoleModalData.newRoleData.rolePages.forEach((iter: any) => {
            if (iter[canItem]) {
                iter[item] = this.newRoleModalData.newRoleData.selectAll[item];
            }
        });
    }

    newRoleCheck(item: string, canItem: string) {
        let result = true;
        this.newRoleModalData.newRoleData.rolePages.forEach((iter: any) => {
            if (iter[canItem] && !iter[item]) {
                result = false;
            }
        });
        this.newRoleModalData.newRoleData.selectAll[item] = result;
    }

    newRoleCanSubmitCheck() {
        this.newRoleModalData.canSubmit = this.newRoleModalData.newRoleData.roleName.status;
    }

    newRoleSubmit() {
        this.newRoleModalData.submitLoading = true;
        if (this.newRoleModalData.type === 'new') {
            this.ipmApiService.newRole({
                name: this.newRoleModalData.newRoleData.roleName.value,
                data: this.newRoleModalData.newRoleData.rolePages.map((item: any) => {
                    return {
                        pageId: item.pageId,
                        allowedCreate: item.allowedCreate, allowedDelete: item.allowedDelete,
                        allowedRead: item.allowedRead, allowedUpdate: item.allowedUpdate,
                    }
                })
            }).subscribe((resp: any) => {
                this.newRoleModalData.submitLoading = false;
                if (resp.status === 204) {
                    this.utils.pagePrompt('success', 'notice.newSuccess', '');
                    this.newRoleEnd();
                } else {
                    this.utils.pagePrompt('error', 'notice.newFail', '');
                }
            }, err => {
                this.newRoleModalData.submitLoading = false;
            })
        } else if (this.newRoleModalData.type === 'edit') {
            this.ipmApiService.editRole(this.role, {
                name: this.newRoleModalData.newRoleData.roleName.value,
                data: this.newRoleModalData.newRoleData.rolePages.map((item: any) => {
                    return {
                        id: item.rolePageId,
                        roleId: this.role,
                        pageId: item.pageId,
                        allowedCreate: item.allowedCreate, allowedDelete: item.allowedDelete,
                        allowedRead: item.allowedRead, allowedUpdate: item.allowedUpdate,
                    }
                })
            }).subscribe((resp: any) => {
                this.newRoleModalData.submitLoading = false;
                if (resp.status === 204) {
                    this.utils.pagePrompt('success', 'notice.updateSuccess', '');
                    this.newRoleEnd(false);
                } else {
                    this.utils.pagePrompt('error', 'notice.updateFail', '');
                }
            }, err => {
                this.newRoleModalData.submitLoading = false;
            })
        }
    }

    newRoleEnd(initPageFlag = true) {
        this.newRoleModalData.onCancel();
        this.newRoleModalData.type = '';
        this.newRoleModalData.newRoleData.roleName = {};
        this.newRoleModalData.newRoleData.rolePages = [];
        if (initPageFlag) {
            this.initPage();
        } else {
            this.tableInfo.pageIndex = 1;
            this.getTableData();
        }
    }

    deleteRole() {
        const modal: NzModalRef = this.modal.create({
            nzContent: this.translate.instant('maintainRole.confirmDeleteRole', {
                roleName: `<span class="font_weight_600 danger_color">${this.roleList.find(item => item.roleId === this.role)?.roleName}</span>`
            }),
            nzClassName: 'confirm_delete_modal',
            nzClosable: false,
            nzCentered: true,
            nzFooter: [{
                label: this.translate.instant('button.cancel'),
                onClick: () => modal.destroy()
            }, {
                label: this.translate.instant('button.confirm'),
                type: 'primary',
                danger: true,
                onClick: () => new Promise<void>(resolve => {
                    if (this.role) {
                        this.ipmApiService.deleteRole(this.role).subscribe((resp: any) => {
                            resolve();
                            if (resp.status === 204) {
                                this.utils.pagePrompt('success', 'notice.deleteSuccess', '');
                                this.initPage();
                                modal.destroy();
                            } else {
                                this.utils.pagePrompt('error', 'notice.deleteFail', '');
                                modal.destroy();
                            }
                        }, error => {
                            resolve();
                        });
                    }
                })
            }]
        });
    }

    getPageNameKey(pageId: string): string {
        let result: string = '';
        switch (pageId) {
            // Budget
            case 'BUDGET_MAINTAIN':
                result = 'budgetMaintain';
                break;
            case 'BUDGET_PRF_MAINTAIN':
                result = 'budgetPRF';
                break;
            // TSS
            case 'TSS_IBCODE_MAINTAIN':
                result = 'tssMaintain';
                break;
            case 'TSS_Report':
                result = 'tssReport';
                break;
            // Month-end Process
            case 'MONTH_END_PROCESS':
                result = 'mep';
                break;
            case 'MONTH_END_PROCESS_MAINTAIN_PAJ-CHARGE_MANMONTH':
                result = 'mepPAJMaintainPAJChargeManMonth';
                break;
            case 'MONTH_END_PROCESS_MAINTAIN_PAJ-TRACKING_REPORT':
                result = 'mepPAJTrackingReport';
                break;
            case 'MONTH_END_PROCESS_MAINTAIN_PAJ-BU_WIWYNN':
                result = 'mepBUWiwynnPAJ';
                break;
            case 'MONTH_END_PROCESS_EXTERNAL_NAME':
                result = 'mepExternalNameMaintain';
                break;
            // PAJ
            case 'PAJ_UPLOAD_TSS':
                result = 'pajUploadTSS';
                break;
            // Report
            case 'REPORT':
                result = 'reportChecking';
                break;
            // basicData
            case 'ENTERPRISE_MAIN':
                result = 'basicDataOrganization';
                break;
            case 'SYSTEM_CAL':
                result = 'basicDataTssCal';
                break;
            case 'SYSTEM_RESOURCE':
                result = 'basicDataResourceGroup';
                break;
            case 'SYSTEM_DIV_DEPT':
                result = 'basicDataDivDept';
                break;
            // maintain
            case 'SYSTEM_PERSON':
                result = 'maintainPerson';
                break;
            case 'SYSTEM_ROLE':
                result = 'maintainRole';
                break;
            default:
                break;
        }
        return result;
    }


    ngOnDestroy() {
        this.getPageListSubscribe?.unsubscribe();
        this.getRoleListSubscribe?.unsubscribe();
        this.getRolePagesSubscribe?.unsubscribe();
    }

}
