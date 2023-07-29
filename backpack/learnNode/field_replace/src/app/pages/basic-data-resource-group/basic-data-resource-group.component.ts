import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Division,
  Permission,
  ResourceGroup,
  TableInfo,
} from '@commonDefine/index';
import { IpmApiService } from '@commonService/ipm-api.service';
import { PermissionsService } from '@commonService/permissions.service';
import { AutoUnsubscrb } from '@commonUtils/autounsubscrb/autounsubscrb';
import { UtilsService } from '@commonUtils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, isEmpty, isEqual, uniqWith } from 'lodash';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { addResourceTable, tableColumns } from './constance';

@AutoUnsubscrb()
@Component({
  selector: 'app-basic-data-resource-group',
  templateUrl: './basic-data-resource-group.component.html',
  styleUrls: ['./basic-data-resource-group.component.scss'],
})
export class BasicDataResourceGroupComponent implements OnInit, OnDestroy {
  constructor(
    public title: Title,
    public translate: TranslateService,
    private modal: NzModalService,
    private permissionsService: PermissionsService,
    private ipmServer: IpmApiService,
    private util: UtilsService
  ) {
    this.title.setTitle(
      this.translate.instant('home.basicDataResourceGroup') +
        ' - ' +
        this.translate.instant('title')
    );
  }

  @ViewChild('dataTable', { static: false }) dataTable: ElementRef | undefined;

  pagePermission: Permission = this.permissionsService.getPagePermissions(
    'basicDataResourceGroup'
  );

  // -------主要内容區域-------
  resourceGroupList: ResourceGroup[] = [];
  editCache: { [key: string]: { edit: boolean; data: ResourceGroup } } = {};
  tableColumns: Array<string> = tableColumns;
  tableInfo: TableInfo = {
    loading: false,
    pageTotal: 0,
    pageIndex: 1,
    pageSize: 10,
    checkedAll: false,
  };
  // ------彈框新增内容------
  addResourceTable: ResourceGroup[] = [];
  addSuccessLoading: boolean = false;
  // util工具
  utils = this.util;

  // Division资源列表
  divList: Division[] = [];
  divLoading: boolean = false;

  isVisible: boolean = false;
  searchKeyWord: string = '';
  searchKeyWordBack: string = '';
  // 订阅
  updateResourceSub$$!: Subscription;
  delResourceSub$$!: Subscription;
  createResourceSub$$!: Subscription;

  addResource() {
    this.isVisible = true;
    this.addResourceTable = cloneDeep(addResourceTable);
  }

  // 模糊搜索
  dataSearch() {
    this.tableInfo.pageIndex = 1;
    this.searchKeyWordBack = this.searchKeyWord;
    this.tablePageIndexChange();
  }

  // 刪除單條resouce-group
  delResource(id: number) {
    const obj = this.resourceGroupList.find((item) => item.id === id);
    const modal: NzModalRef = this.modal.create({
      nzContent: this.translate.instant('messages.sureDel', {
        keyValue: `<span>${this.translate.instant(
          'tableHead.resource'
        )}</span>`,
        basicList: `<br /><span class="font_weight_600 danger_color">${obj?.resource}</span>`,
      }),
      nzClassName: 'confirm_delete_modal',
      nzClosable: false,
      nzCentered: true,
      nzFooter: [
        {
          label: this.translate.instant('button.cancel'),
          onClick: () => modal.destroy(),
        },
        {
          label: this.translate.instant('button.confirm'),
          type: 'primary',
          danger: true,
          onClick: () =>
            new Promise<void>((resolve) => {
              this.tableInfo.loading = true;
              this.isVisible = false;
              this.delResourceSub$$ = this.ipmServer
                .delResourceById(id)
                .subscribe(({ status }) => {
                  resolve();
                  if ([204].includes(status)) {
                    this.util.pagePrompt('success', 'notice.deleteSuccess');
                    this.resourceGroupList = this.resourceGroupList.filter(
                      (item) => item.id !== id
                    );
                    if (isEmpty(this.resourceGroupList)) {
                      this.tableInfo.pageIndex = 1;
                      this.searchKeyWord = this.searchKeyWordBack = '';
                      this.getResourceList();
                    }
                  } else {
                    this.util.pagePrompt('error', 'notice.deleteFail');
                  }
                });
              this.tableInfo.loading = false;
              modal.destroy();
            }),
        },
      ],
    });
  }

  // 开启修改单条Div
  editResource(id: number) {
    this.editCache[id].edit = true;
  }

  // 取消单条修改div
  cancelEdit(id: number) {
    const index = this.resourceGroupList.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.resourceGroupList[index] },
      edit: false,
    };
  }

  // 确认修改单条Div
  saveEdit(id: number): void {
    const index = this.resourceGroupList.findIndex((item) => item.id === id);
    const modal: NzModalRef = this.modal.create({
      nzContent: this.translate.instant('messages.sureUpdate', {
        TssCalList: `<br /><span class="font_weight_600 danger_color">${
          this.translate.instant('tableHead.div') +
          ': ' +
          this.editCache[id].data.divName
        }</span>`,
      }),
      nzClassName: 'confirm_delete_modal',
      nzClosable: false,
      nzCentered: true,
      nzFooter: [
        {
          label: this.translate.instant('button.cancel'),
          onClick: () => {
            this.cancelEdit(id);
            modal.destroy();
          },
        },
        {
          label: this.translate.instant('button.confirm'),
          type: 'primary',
          danger: true,
          onClick: () =>
            new Promise<void>((resolve, reject) => {
              this.tableInfo.loading = true;
              this.updateResourceSub$$ = this.ipmServer
                .updateResource(this.editCache[id].data)
                .subscribe(({ status, body }) => {
                  if ([204].includes(status)) {
                    this.util.pagePrompt('success', 'notice.updateSuccess');
                    resolve();
                  } else if (body?.msg === 'exist') {
                    this.util.pagePrompt('error', 'messages.cannotRepeat');
                    reject();
                  } else {
                    this.util.pagePrompt('error', 'notice.updateFail');
                    reject();
                  }
                });
            }).then(() => {
                Object.assign(
                  this.resourceGroupList[index],
                  this.editCache[id].data
                );
                this.editCache[id].edit = false;
              })
              .catch(() => {
                this.cancelEdit(id);
              })
              .finally(() => {
                this.tableInfo.loading = false;
                modal.destroy();
              }),
        },
      ],
    });
  }

  updateEditCache(): void {
    this.resourceGroupList.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  trackFn(index: number, item: any) {
    return index;
  }

  // -------彈框新增區域----------
  // 资料是否为空，为true按钮不能点击
  isEmpty() {
    if (isEmpty(this.addResourceTable)) return true;
    return this.addResourceTable.some((item) => {
      return item.resource.trim() === '' || item.divName === '';
    });
  }

  addAddResource() {
    const year = new Date().getFullYear();
    if (this.addResourceTable.length <= 0) {
      this.addResourceTable = [
        {
          id: 1,
          resource: '',
          divName: '',
          year,
        },
      ];
      return;
    }
    const length = this.addResourceTable.length - 1;
    this.addResourceTable = [
      ...this.addResourceTable,
      {
        id: this.addResourceTable[length].id + 1,
        resource: '',
        divName: '',
        year,
      },
    ];
  }

  // 刪除單條新增Resource
  delAddResource(id: number) {
    this.addResourceTable = this.addResourceTable.filter(
      (item) => item.id !== id
    );
  }

  // 取消新增彈框
  handleCancel() {
    this.addSuccessLoading = false;
    this.isVisible = false;
    this.tableInfo.loading = false;
  }

  // 確認新增
  handleOk() {
    this.addSuccessLoading = true;
    const list = this.addResourceTable.map((item) => {
      return {
        resource: item.resource,
        divName: item.divName,
      };
    });
    const data = uniqWith(list, isEqual);
    new Promise<void>((resolve) => {
      return (this.createResourceSub$$ = this.ipmServer
        .createResource(data)
        .pipe(
          catchError(() => {
            this.addSuccessLoading = false;
            this.tableInfo.loading = false;
            return of({ status: 500 });
          })
        )
        .subscribe(({ body, status }) => {
          if (body?.msg === 'exist') {
            this.util.pagePrompt('error', 'messages.cannotRepeat');
            this.addSuccessLoading = false;
            return;
          } else if ([200].includes(status)) {
            this.util.pagePrompt('success', 'notice.newSuccess');
          } else {
            this.util.pagePrompt('error', 'notice.newFail');
          }
          this.addSuccessLoading = false;
          this.isVisible = false;
          this.tableInfo.pageIndex = 1;
          this.getResourceList();
          resolve();
        }));
    }).then(() => {
      this.handleCancel();
    });
  }

  getDivs() {
    this.divLoading = true;
    this.ipmServer.getDivs().subscribe((data) => {
      this.divLoading = false;
      this.divList = data;
    });
  }

  divOpenChange(bool: boolean) {
    bool && this.getDivs();
  }

  // 翻頁
  tablePageIndexChange() {
    this.getResourceList();
  }

  async getResourceList() {
    this.tableInfo.loading = true;
    const { body, headers } = await this.ipmServer.getResource({
      filter: JSON.stringify({
        limit: this.tableInfo.pageSize,
        skip: (this.tableInfo.pageIndex - 1) * this.tableInfo.pageSize,
        where: {
          or: [
            {
              resource: {
                ilike: '%' + this.searchKeyWordBack.trim() + '%',
              },
            },
            {
              divName: {
                ilike: '%' + this.searchKeyWordBack.trim() + '%',
              },
            },
          ],
        },
      }),
    });
    this.tableInfo.pageTotal = Number(headers.get('count'));
    this.resourceGroupList = body as [];
    this.updateEditCache();
    this.tableInfo.loading = false;
  }

  ngOnInit() {
    this.util.setPageSize().then(() => {
      this.tableInfo.pageSize = Math.floor(
        (this.dataTable?.nativeElement.clientHeight - 64 - 48) / 50
      );
      this.getResourceList();
      this.getDivs();
      this.addResourceTable = cloneDeep(addResourceTable);
    });
  }

  ngOnDestroy(): void {}
}
