import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DeptExpand, DivDept, SupervisorExpand } from '@commonDefine/basic-data-div-dept.define';
import { Permission, Tab, TableInfo } from '@commonDefine/common.define';
import { IpmApiService } from '@commonService/ipm-api.service';
import { PermissionsService } from '@commonService/permissions.service';
import { UtilsService } from '@commonUtils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-basic-data-resource-group',
    templateUrl: './basic-data-div-dept.component.html',
    styleUrls: ['./basic-data-div-dept.component.scss'],
})
export class BasicDataDivDeptComponent implements OnInit {

    @ViewChild('dataTable', { static: false }) dataTable: | ElementRef | undefined;

    pagePermission: Permission = this.permissionsService.getPagePermissions('basicDataDivDept');

    searchKeyWord: string = '';

    tableInfo: TableInfo = {
        loading: false,
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 8,
        checkedAll: false,
    };

    getTableDataSubscribe: any = null;

    divDeptData: DivDept[] = [];

    newDivDeptModalData: any = {
        title: '',
        width: 1600,
        className: 'new_div_dept_modal',
        type: '',
        show: false,
        newDivDeptData: {},
        canSubmit: false,
        submitLoading: false,
        onShow: () => { this.newDivDeptModalData.show = true },
        onCancel: () => { this.newDivDeptModalData.show = false }
    }

    oneNewDivDeptSupervisorData: any = {
        divId: 0,
        chineseName: { title: '', value: '', must: true, status: false, type: 'input' },
        englishName: { title: '', value: '', must: true, status: false, type: 'input' },
        email: { title: '', value: '', must: true, status: false, type: 'email' }
    };

    oneNewDivDeptDeptData: any = {
        divId: 0,
        div: '',
        deptFrom: { title: '', value: '', must: true, status: false, type: 'input' },
        deptTo: { title: '', value: '', must: true, status: false, type: 'input' }
    };

    checkFlag: boolean = false;
    checkList: DivDept[] = [];
    deleteFlag: boolean = false;

    constructor(
        public title: Title,
        public translate: TranslateService,
        private ipmApiService: IpmApiService,
        public utils: UtilsService,
        public permissionsService: PermissionsService,
        private modal: NzModalService,
    ) {
        this.title.setTitle(this.translate.instant('home.basicDataDivDept') + ' - ' + this.translate.instant('title'));
    }

    ngOnInit() {
        this.initPage();
    }

    initPage(flag: boolean = true) {
        const initPro = new Promise<void>((resolve, reject) => {
            resolve();
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
        this.getTableDataSubscribe = this.ipmApiService.getDivDept({
            filter: JSON.stringify({
                limit, skip,
                where: {
                    and: [
                        {
                            or: [
                                { name: { ilike: `%${this.searchKeyWord}%` } },
                                { divCode: { ilike: `%${this.searchKeyWord}%` } }
                            ]
                        }
                    ],
                },
                include: [{ relation: "divSupervisiors" }, { relation: "depts" }]
            })
        }).subscribe((resp: any) => {
            this.divDeptData = resp.body.map((item: any) => {
                return {
                    id: item.id,
                    div: item.name,
                    divCode: item.divCode,
                    function: item.function,
                    rate: item.rate,
                    checked: false,
                    expand: false,
                    supervisorExpand: item.divSupervisiors ? item.divSupervisiors.map((iter: any) => {
                        return {
                            id: iter.id,
                            divId: iter.divId,
                            chineseName: iter.chineseName,
                            englishName: iter.englishName,
                            email: iter.email
                        }
                    }) : [],
                    deptExpand: item.depts ? item.depts.map((iter: any) => {
                        return {
                            id: iter.id,
                            divId: iter.divId,
                            div: iter.div,
                            deptFrom: iter.deptFrom,
                            deptTo: iter.deptTo
                        }
                    }) : []
                }
            });
            this.tableInfo.pageTotal = Number(resp.headers.get('count'));
            this.tableInfo.loading = false;
        })
    }

    tablePageIndexChange() {
        this.getTableData();
    }

    dataSearch() {
        this.tableInfo.pageIndex = 1;
        this.getTableData();
    }

    newDivDeptStart(type: string, data?: DivDept) {
        this.newDivDeptModalData.type = type;
        this.newDivDeptModalData.title = type === 'edit' ? 'basicDataDivDept.editDivDept' : 'basicDataDivDept.newDivDept';
        this.newDivDeptModalData.newDivDeptData.inputData = [
            { title: 'tableHead.div', value: type === 'edit' ? data?.div : '', must: true, status: false, type: 'input' },
            { title: 'tableHead.divCode', value: type === 'edit' ? data?.divCode : '', must: true, status: false, type: 'input' },
            { title: 'tableHead.function', value: type === 'edit' ? data?.function : '', must: true, status: false, type: 'input' },
            { title: 'tableHead.rate', value: type === 'edit' ? Number(data?.rate.replace(/^\$|\,|\.\d{0,2}$/g, '')) : 100000, must: true, status: false, type: 'number', step: 10000, range: [0, 100000000000] },
        ];
        if (type === 'edit') {
            this.oneNewDivDeptSupervisorData.divId = data?.id;
            this.oneNewDivDeptDeptData.divId = data?.id;
            this.oneNewDivDeptDeptData.div = data?.div;
        }
        this.newDivDeptModalData.newDivDeptData.supervisorData = type === 'edit' ? data?.supervisorExpand.map((item: SupervisorExpand) => {
            const taregt = this.utils.deepClone(this.oneNewDivDeptSupervisorData);
            taregt.divId = item.divId;
            taregt.chineseName.value = item.chineseName;
            taregt.englishName.value = item.englishName;
            taregt.email.value = item.email;
            return taregt
        }) : [this.utils.deepClone(this.oneNewDivDeptSupervisorData)];
        this.newDivDeptModalData.newDivDeptData.deptData = type === 'edit' ? data?.deptExpand.map((item: DeptExpand) => {
            const taregt = this.utils.deepClone(this.oneNewDivDeptDeptData);
            taregt.divId = item.divId;
            taregt.div = item.div;
            taregt.deptFrom.value = item.deptFrom;
            taregt.deptTo.value = item.deptTo;
            return taregt
        }) : [this.utils.deepClone(this.oneNewDivDeptDeptData)];
        this.newDivDeptModalData.onShow();
    }

    newDivDeptInputDataChange(item: any) {
        this.newDivDeptCheckCanSubmit();
    }

    newDivDeptSupervisorDataChange(item?: any, itemName?: string) {
        if (itemName === 'email') {
            const emails = this.newDivDeptModalData.newDivDeptData.supervisorData.map((iter: any) => iter.email.value).filter((iter: any) => iter);
            const emailsBack = Array.from(new Set(emails));
            if (emailsBack.length !== emails.length) {
                this.utils.pagePrompt('warning', 'basicDataDivDept.emailWarning', '');
                this.newDivDeptCheckCanSubmit(false);
            } else {
                this.newDivDeptCheckCanSubmit();
            }
        } else {
            this.newDivDeptCheckCanSubmit();
        }
    }

    newDivDeptSupervisorDataRemove(j: number) {
        if (this.newDivDeptModalData.newDivDeptData.supervisorData.length > 1) {
            this.newDivDeptModalData.newDivDeptData.supervisorData.splice(j, 1);
            this.newDivDeptModalData.newDivDeptData.supervisorData = this.utils.deepClone(this.newDivDeptModalData.newDivDeptData.supervisorData);
        }
    }

    newDivDeptSupervisorDataAdd() {
        this.newDivDeptModalData.newDivDeptData.supervisorData = Array.prototype.concat(
            ...this.newDivDeptModalData.newDivDeptData.supervisorData,
            this.utils.deepClone(this.oneNewDivDeptSupervisorData)
        )
    }

    newDivDeptDeptDataChange() {
        this.newDivDeptCheckCanSubmit();
    }

    newDivDeptDeptDataRemove(j: number) {
        if (this.newDivDeptModalData.newDivDeptData.deptData.length > 1) {
            this.newDivDeptModalData.newDivDeptData.deptData.splice(j, 1);
            this.newDivDeptModalData.newDivDeptData.deptData = this.utils.deepClone(this.newDivDeptModalData.newDivDeptData.deptData);
        }
    }

    newDivDeptDeptDataAdd() {
        this.newDivDeptModalData.newDivDeptData.deptData = Array.prototype.concat(
            ...this.newDivDeptModalData.newDivDeptData.deptData,
            this.utils.deepClone(this.oneNewDivDeptDeptData)
        )
    }

    newDivDeptCheckCanSubmit(baseFlag: boolean = true) {
        const inputDataCanSubmit = this.newDivDeptModalData.newDivDeptData.inputData.findIndex((item: any) => !item.status) === -1;
        const supervisorDataCanSubmit = this.newDivDeptModalData.newDivDeptData.supervisorData.map((item: any) =>
            item.chineseName.status && item.englishName.status && item.email.status
        ).findIndex((item: any) => !item) === -1;
        const deptDataCanSubmit = this.newDivDeptModalData.newDivDeptData.deptData.map((item: any) =>
            item.deptFrom.status && item.deptTo.status
        ).findIndex((item: any) => !item) === -1;
        this.newDivDeptModalData.canSubmit = baseFlag && inputDataCanSubmit && supervisorDataCanSubmit && deptDataCanSubmit;
    }

    newDivDeptSubmit() {
        this.newDivDeptModalData.submitLoading = true;
        const newDivDeptData: any = {
            "name": this.newDivDeptModalData.newDivDeptData.inputData.find((item: any) => item.title === 'tableHead.div').value,
            "divCode": this.newDivDeptModalData.newDivDeptData.inputData.find((item: any) => item.title === 'tableHead.divCode').value,
            "function": this.newDivDeptModalData.newDivDeptData.inputData.find((item: any) => item.title === 'tableHead.function').value,
            "rate": this.newDivDeptModalData.newDivDeptData.inputData.find((item: any) => item.title === 'tableHead.rate').value,
            "divSupervisiors": this.newDivDeptModalData.newDivDeptData.supervisorData.map((item: any) => {
                return {
                    "divId": item.divId,
                    "chineseName": item.chineseName.value,
                    "englishName": item.englishName.value,
                    "email": item.email.value
                }
            }),
            "depts": this.newDivDeptModalData.newDivDeptData.deptData.map((item: any) => {
                return {
                    "divId": item.divId,
                    "div": this.newDivDeptModalData.type === 'new' ?
                        this.newDivDeptModalData.newDivDeptData.inputData.find((item: any) => item.title === 'tableHead.div').value :
                        item.div,
                    "deptFrom": item.deptFrom.value,
                    "deptTo": item.deptTo.value
                }
            })
        };
        if (this.newDivDeptModalData.type === 'new') {
            this.ipmApiService.addNewDiv([newDivDeptData]).subscribe((resp: any) => {
                this.newDivDeptModalData.submitLoading = false;
                if (resp.msg === 'success') {
                    this.utils.pagePrompt('success', 'notice.newSuccess', '');
                    this.newDivDeptEnd();
                } else if (resp.msg === 'exist') {
                    this.utils.pagePrompt('warning', 'notice.newDataExist', '');
                } else {
                    this.utils.pagePrompt('error', 'notice.newFail', '');
                }
            }, error => {
                this.newDivDeptModalData.submitLoading = false;
            })
        } else if (this.newDivDeptModalData.type === 'edit') {
            this.ipmApiService.editDiv(newDivDeptData.divSupervisiors[0].divId, [newDivDeptData]).subscribe((resp: any) => {
                this.newDivDeptModalData.submitLoading = false;
                if (resp.msg === 'success') {
                    this.utils.pagePrompt('success', 'notice.updateSuccess', '');
                    this.newDivDeptEnd();
                } else if (resp.msg === 'exist') {
                    this.utils.pagePrompt('warning', 'notice.newDataExist', '');
                } else {
                    this.utils.pagePrompt('error', 'notice.updateFail', '');
                }
            }, error => {
                this.newDivDeptModalData.submitLoading = false;
            })
        }
    }

    newDivDeptEnd() {
        this.newDivDeptModalData.onCancel();
        setTimeout(() => {
            this.newDivDeptModalData.newBudgetData = {
                inputData: [],
                supervisorData: [],
                deptData: []
            };
            if (this.newDivDeptModalData.type === 'new') {
                this.initPage();
            } else if (this.newDivDeptModalData.type === 'edit') {
                this.initPage(false);
            }
        }, 0);
    }

    checkedAll() {
        this.divDeptData.forEach(item => {
            item.checked = this.tableInfo.checkedAll
        });
    }

    checkedItem() {
        let flag = true;
        this.divDeptData.forEach(item => {
            if (!item.checked) {
                flag = false;
            }
        })
        this.tableInfo.checkedAll = flag;
    }

    deleteStart() {
        this.checkList = [];
        this.checkFlag = true;
        this.deleteFlag = true;
        this.divDeptData.forEach(item => {
            item.expand = false;
        })
    }

    cancelDelete() {
        this.checkList = [];
        this.checkFlag = false;
        this.deleteFlag = false;
    }

    confirmDelete() {
        this.checkList = this.divDeptData.filter(item => item.checked);
        if (this.checkList.length > 0) {
            this.deleteReal();
        }
    }

    deleteItem(item: DivDept) {
        this.checkList = [item];
        this.deleteReal();
    }

    deleteReal() {
        const modal: NzModalRef = this.modal.create({
            nzContent: this.translate.instant('basicDataDivDept.confirmDeleteDivDept', {
                divDeptList: `<span class="font_weight_600 danger_color">${this.checkList.map(item => '<br >' + item.div + '-' + item.divCode).join('')}</span>`
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
                    console.log(this.checkList.map(item => item.id));
                    this.ipmApiService.deleteDiv(this.checkList.map(item => item.id)).subscribe((resp: any) => {
                        resolve();
                        if (resp.status === 204) {
                            this.utils.pagePrompt('success', 'notice.deleteSuccess', '');
                            this.tableInfo.pageIndex = 1;
                            this.getTableData();
                            modal.destroy();
                        } else {
                            this.utils.pagePrompt('error', 'notice.deleteFail', '');
                            modal.destroy();
                        }
                    }, error => {
                        resolve();
                    });
                })
            }]
        });
    }


}
