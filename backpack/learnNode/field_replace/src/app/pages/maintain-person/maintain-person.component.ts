import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { Permission, TableInfo } from 'src/app/define/common.define';
import { PersonInfo } from 'src/app/define/maintain-person.define';
import { Role } from 'src/app/define/maintain-role.define';
import { IpmApiService } from 'src/app/services/ipm-api.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { UtilsService } from 'src/app/utils/utils.service';


@Component({
    selector: 'app-maintain-person',
    templateUrl: './maintain-person.component.html',
    styleUrls: ['./maintain-person.component.scss']
})
export class MaintainPersonComponent implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: ElementRef | undefined;

    pagePermission: Permission = this.permissionsService.getPagePermissions('maintainPerson')

    searchKeyWord: string = '';

    roleList: Role[] = [];

    tableInfo: TableInfo = {
        loading: false,
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 8,
        checkedAll: false
    }

    personInfoData: PersonInfo[] = [];

    deleteFlag: boolean = false;
    deleteList: PersonInfo[] = [];

    getRoleListSubscribe: Subscription | undefined;
    getPersonInfoSubscribe: Subscription | undefined;

    constructor(
        public title: Title,
        public translate: TranslateService,
        public ipmApiService: IpmApiService,
        public utils: UtilsService,
        private modal: NzModalService,
        public permissionsService: PermissionsService,
    ) {
        this.title.setTitle(this.translate.instant('home.maintainPerson') + ' - ' + this.translate.instant('title'));
    }

    ngOnInit(): void {
        this.initPage();
    }

    initPage() {
        this.tableInfo.loading = true;
        this.roleList = [];
        const initPro = new Promise<void>((resolve, reject) => {
            this.getRoleListSubscribe = this.ipmApiService.getRoles().subscribe((resp: any) => {
                this.roleList = resp.map((item: any) => {
                    return { roleId: item.id, roleName: item.name }
                });
                resolve();
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

        this.getPersonInfoSubscribe = this.ipmApiService.getPersonInfo({
            filter: JSON.stringify({
                limit, skip,
                order: ['updatedAt DESC'],
                where: {
                    or: [
                        { empno: { ilike: `%${this.searchKeyWord}%` } },
                        { nameC: { ilike: `%${this.searchKeyWord}%` } },
                        { nameE: { ilike: `%${this.searchKeyWord}%` } },
                        { email: { ilike: `%${this.searchKeyWord}%` } }
                    ]
                }
            })
        }).subscribe((resp: any) => {
            this.personInfoData = resp.body.map((item: any) => {
                return {
                    id: item.id,
                    empno: item.empno,
                    nameC: item.nameC,
                    nameE: item.nameE,
                    email: item.email,
                    roleId: item.roleId,
                    checked: false
                }
            })
            this.tableInfo.pageTotal = Number(resp.headers.get('count'));
            this.tableInfo.loading = false;
        });
    }

    tablePageIndexChange() {
        this.getTableData();
    }

    dataSearch() {
        this.tableInfo.pageIndex = 1;
        this.getTableData();
    }

    checkedAll() {
        this.personInfoData.forEach(item => item.checked = this.tableInfo.checkedAll);
    }

    checkedItem() {
        let flag = true;
        this.personInfoData.forEach(item => {
            if (!item.checked) {
                flag = false;
            }
        })
        this.tableInfo.checkedAll = flag;
    }

    deleteData() {
        this.deleteList = [];
        this.deleteFlag = true;
    }

    cancelDelete() {
        this.deleteList = [];
        this.deleteFlag = false;
        this.tableInfo.checkedAll = false;
        this.personInfoData.forEach(item => item.checked = false);
    }

    confirmDelete() {
        this.deleteList = this.personInfoData.filter(item => item.checked);
        if (this.deleteList.length > 0) {
            this.deleteReal();
        }
    }

    deleteItem(item: PersonInfo) {
        this.deleteList = [item];
        this.deleteReal();
    }

    deleteReal() {
        const modal: NzModalRef = this.modal.create({
            nzContent: this.translate.instant('maintainPerson.confirmDeletePerson', {
                personList: `<span class="font_weight_600 danger_color">${this.deleteList.map(item => '<br >' + item.nameC).join('')}</span>`
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
                    this.ipmApiService.deletePersonInfo(this.deleteList.map(item => item.id)).subscribe((resp: any) => {
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

    roleIdChange(item: PersonInfo) {
        this.ipmApiService.editPersonInfo(item.id, {
            roleId: item.roleId
        }).subscribe((resp: any) => {
            if (resp.status === 204) {
                this.utils.pagePrompt('success', 'notice.updateSuccess', '');
                this.getTableData();
                // window.location.reload();
            } else {
                this.utils.pagePrompt('error', 'notice.updateFail', '');
            }
        })
    }



    ngOnDestroy() {
        this.getRoleListSubscribe?.unsubscribe();
        this.getPersonInfoSubscribe?.unsubscribe();
    }

}
