import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Division } from '@commonDefine/basic-data-reource-group';
import { Extrtna } from '@commonDefine/basic-data-tss-cal';
import { Permission, TableInfo } from '@commonDefine/common.define';
import { IpmApiService } from '@commonService/ipm-api.service';
import { PermissionsService } from '@commonService/permissions.service';
import { UtilsService } from '@commonUtils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { externaColumns } from '@pages/basic-data-tss-cal/constance';
import { throttle, cloneDeep, isEmpty, uniqWith, isEqual } from 'lodash';
import moment from 'moment';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { addExtrtnaTable } from './constance';

@Component({
  selector: 'app-mep-external-name-maintain',
  templateUrl: './mep-external-name-maintain.component.html',
  styleUrls: ['./mep-external-name-maintain.component.scss'],
})
export class MepExternalNameMaintainComponent implements OnInit {
  constructor(
    public title: Title,
    public translate: TranslateService,
    private modal: NzModalService,
    private permissionsService: PermissionsService,
    private ipmServer: IpmApiService,
    private util: UtilsService
  ) {
    this.title.setTitle(
      this.translate.instant('home.mepExternalNameMaintain') +
        ' - ' +
        this.translate.instant('title')
    );
  }

  @ViewChild('dataTable', { static: false }) dataTable: ElementRef | undefined;

  pagePermission: Permission =
    this.permissionsService.getPagePermissions('mepExternalNameMaintain');
  // 外部人員維護
  externaList: Extrtna[] = [];
  externaColumns: Array<string> = externaColumns;
  tableInfo: TableInfo = {
    loading: false,
    pageTotal: 0,
    pageIndex: 1,
    pageSize: 10,
    checkedAll: false,
  };
  // ------外部人員名單新增-------
  isVisible: boolean = false;
  addExtrtnaTable: Extrtna[] = [];
  externaSuccessLoading: boolean = false;
  divList: Division[] = [];
  divLoading: boolean = false;
  // 搜索栏位
  searchKeyWord: string = '';
  searchKeyWordBack: string = '';
  // ------订阅----
  delEtrtnaSub$$!: Subscription;
  extrtnaSub$$!: Subscription;
  // util工具service
  utils = this.util;

  trackFn(index: number, item: any) {
    return item.id;
  }

  dataSearch = throttle(
    () => {
      this.tableInfo.pageIndex = 1;
      this.searchKeyWordBack = this.searchKeyWord;
      this.tablePageIndexChange();
    },
    1000,
    {
      trailing: false,
    }
  );

  // 新增tss-cal/外部人員名單弹框
  addBasic() {
    this.isVisible = true;
    this.addExtrtnaTable = cloneDeep(addExtrtnaTable);
  }

  isEmpty() {
    if (isEmpty(this.addExtrtnaTable)) return true;
    return this.addExtrtnaTable.some((item) => {
      return item.empName.trim() === '' || item.div === '';
    });
  }

  // TSS-CAL取消新增
  handleCancel() {
    this.isVisible = false;
    this.tableInfo.loading = false;
  }

  // 確認新增
  handleOk() {
    this.tableInfo.loading = true;
    this.externaSuccessLoading = true;
    const list = this.addExtrtnaTable.map((item) => {
      return {
        empName: item.empName.trim(),
        year: item.year.toString(),
        div: item.div,
      };
    });
    const addDataList = uniqWith(list, isEqual);
    this.extrtnaSub$$ = this.ipmServer
      .createExtrtna(addDataList)
      .pipe(
        catchError((err) => {
          this.tableInfo.loading = false;
          this.externaSuccessLoading = false;
          return of({ status: 500, body: [] });
        })
      )
      .subscribe(({ body, status }) => {
        this.externaSuccessLoading = false;
        if (body?.msg === 'exist') {
          this.util.pagePrompt('error', 'messages.cannotRepeat');
        }
        if ([204].includes(status)) {
          this.tableInfo.pageIndex = 1;
          this.handleCancel();
          this.util.pagePrompt('success', 'notice.newSuccess');
          this.getExternaList();
        }
      });
  }

  deleteExterna(id: number) {
    const obj = this.externaList.find((item) => item.id === id);
    const modal: NzModalRef = this.modal.create({
      nzContent: this.translate.instant('messages.sureDel', {
        keyValue: `<span>${this.translate.instant('tableHead.empName')}</span>`,
        basicList: `<br /><span class="font_weight_600 danger_color">${obj?.empName}</span>`,
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
              this.delEtrtnaSub$$ = this.ipmServer
                .delEtrtnaById(id)
                .subscribe(({ status }) => {
                  resolve();
                  if ([204].includes(status)) {
                    this.util.pagePrompt('success', 'notice.deleteSuccess');
                    this.externaList = this.externaList.filter(
                      (item) => item.id !== id
                    );
                    if (isEmpty(this.externaList)) {
                      this.tableInfo.pageIndex = 1;
                      this.searchKeyWord = this.searchKeyWordBack = ''
                      this.getExternaList();
                    }
                  } else {
                    this.util.pagePrompt('error', 'notice.deleteFail');
                  }
                  this.tableInfo.loading = false;
                  modal.destroy();
                });
            }),
        },
      ],
    });
  }

  //添加一條外部人員訊息
  insertAddExtrtList() {
    if (this.addExtrtnaTable.length <= 0) {
      this.addExtrtnaTable = [
        {
          id: 1,
          empName: '',
          div: '',
          year: moment().year(),
        },
      ];
      return;
    }
    const length = this.addExtrtnaTable.length - 1;
    this.addExtrtnaTable = [
      ...this.addExtrtnaTable,
      {
        id: this.addExtrtnaTable[length].id + 1,
        empName: '',
        div: '',
        year: moment().year(),
      },
    ];
  }

  // 刪除新增單個的外部人員
  delAddExtrtna(id: number) {
    this.addExtrtnaTable = this.addExtrtnaTable.filter(
      (item) => item.id !== id
    );
  }

  // 获取externa基础数据
  async getExternaList() {
    this.tableInfo.loading = true;
    const { body, headers, status } = await this.ipmServer.getExtrtnaList({
      filter: JSON.stringify({
        limit: this.tableInfo.pageSize,
        skip: (this.tableInfo.pageIndex - 1) * this.tableInfo.pageSize,
        where: {
          or: [
            {
              empName: {
                ilike: '%' + this.searchKeyWordBack.trim() + '%',
              },
            },
            {
              div: {
                ilike: '%' + this.searchKeyWordBack.trim() + '%',
              },
            },
          ],
        },
      }),
    });

    if (![200].includes(status)) {
      this.tableInfo.loading = false;
      return;
    }

    this.tableInfo.pageTotal = Number(headers.get('count'));
    this.externaList = body || [];
    this.tableInfo.loading = false;
  }

  // -------Division相关---------
  // 远程加载divs
  divOpenChange(bool: boolean) {
    if (bool) {
      this.divLoading = true;
      this.ipmServer.getDivs().subscribe((data) => {
        this.divLoading = false;
        this.divList = data;
      });
    }
  }

  // 翻页
  tablePageIndexChange() {
    this.getExternaList();
  }

  ngOnInit() {
    this.util.setPageSize().then(() => {
      this.tableInfo.pageSize = Math.floor(
        (this.dataTable?.nativeElement.clientHeight - 64 - 48) / 50
      );
      this.tableInfo.pageSize = this.tableInfo.pageSize;
      this.getExternaList();
      this.addExtrtnaTable = addExtrtnaTable;
    });
  }

  ngOnDestroy(): void {
    this.dataSearch.cancel();
  }
}
