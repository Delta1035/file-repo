import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  AddInfo,
  BasicAllData,
  BasicDataRules,
  BG,
  BO,
  BU,
  SelectList,
} from '@commonDefine/index';
import { Permission, TableInfo } from '@commonDefine/common.define';
import { TranslateService } from '@ngx-translate/core';
import { addInfoTable, fields } from './constance';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PermissionsService } from '@commonService/permissions.service';
import { IpmApiService } from '@commonService/index';
import { AutoUnsubscrb } from '@commonUtils/autounsubscrb/autounsubscrb';
import { Subscription } from 'rxjs';
import { isEmpty, isEqual, uniqWith } from 'lodash';
import { BasicDataService, UtilsService } from '@commonUtils/index';

@AutoUnsubscrb()
@Component({
  selector: 'app-basic-data-organization',
  templateUrl: './basic-data-organization.component.html',
  styleUrls: ['./basic-data-organization.component.scss'],
})
export class BasicDataOrganizationComponent implements OnInit, OnDestroy {
  @ViewChild('dataTable', { static: false }) dataTable: ElementRef | undefined;

  constructor(
    public title: Title,
    public translate: TranslateService,
    private modal: NzModalService,
    private permissionsService: PermissionsService,
    private ipmServer: IpmApiService,
    private basicServer: BasicDataService,
    private util: UtilsService
  ) {
    this.title.setTitle(
      this.translate.instant('home.basicDataOrganization') +
        ' - ' +
        this.translate.instant('title')
    );
  }

  // 權限
  pagePermission: Permission = this.permissionsService.getPagePermissions(
    'basicDataOrganization'
  );
  // 企業管理表格資料
  EnterpriseData: BasicDataRules[] = [];
  tableInfo: TableInfo = {
    loading: false,
    pageTotal: 0,
    pageIndex: 1,
    pageSize: 10,
    checkedAll: false,
  };
  // 搜索的內容
  searchKeyWord: string = '';
  isVisible: boolean = false;
  // BO/BU/BG的初始資料
  boDataList: BO[] = [];
  buDataList: BU[] = [];
  bgDataList: BG[] = [];
  selectFilterList: SelectList[] = [];
  // 新增的表格資料
  addInfoTable: AddInfo[] = [];
  // 訂閱
  subscription$$!: Subscription;
  getBasicScription$$!: Subscription;
  bgSubscripttion$$!: Subscription;
  addDataScription$$!: Subscription;
  delBuScription$$!: Subscription;
  // util工具
  utils = this.util;

  addBasic() {
    this.tableInfo.loading = true;
    this.tableInfo = {
      loading: false,
      pageTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      checkedAll: false,
    };
    // 每次點擊新增資料將表格資料重置
    this.addInfoTable = [
      {
        id: 1,
        bo: '',
        bu: '',
        bg: '',
      },
    ];
    this.isVisible = true;
  }

  // 搜索企業數據
  dataSearch() {
    this.tableInfo.loading = true;
    const searchValue = this.searchKeyWord.trim();
    this.tableInfo.pageIndex = 1;
    this.getBasicScription$$ = this.ipmServer
      .fuzzyEnterprise<BasicDataRules>(searchValue.toUpperCase())
      .subscribe((data) => {
        this.EnterpriseData = data;
        this.tableInfo.loading = false;
      });
  }

  // 下拉菜單展開的時候
  selectChange(bool: boolean, type: 'bo' | 'bg') {
    if (bool && ['bo'].includes(type)) {
      const params = {
        filter: JSON.stringify({
          include: [
            {
              relation: 'bgs',
            },
          ],
        }),
      };

      this.getBasicScription$$ = this.ipmServer
        .getBasicData<SelectList>(params)
        .subscribe((data) => {
          this.selectFilterList = data;
        });
    }
  }

  // opertion選擇項改變
  modelChange(value: string, type: 'bo' | 'bg') {
    if (['bo'].includes(type)) {
      this.bgDataList = [];
      this.bgDataList = this.selectFilterList.filter(
        (item) => item.bo === value
      )[0].bgs;
    }
  }

  addEnpirsee() {
    if (this.addInfoTable.length <= 0) {
      this.addInfoTable = [
        {
          id: 1,
          bo: '',
          bu: '',
          bg: '',
        },
      ];
      return;
    }

    const length = this.addInfoTable.length - 1;
    this.addInfoTable = [
      ...this.addInfoTable,
      {
        id: this.addInfoTable[length].id + 1,
        bo: '',
        bu: '',
        bg: '',
      },
    ];
  }

  delEnpirsee(id: number) {
    this.addInfoTable = this.addInfoTable.filter(
      (item: { id: number }) => item.id !== id
    );
  }

  // 新增select item
  addItem(input: HTMLInputElement, type: 'bo' | 'bg', index: number): void {
    const value = input.value.trim();
    if (isEmpty(value)) return;

    switch (type) {
      case 'bo':
        if (
          this.selectFilterList.filter((item) => item.bo === value).length <= 0
        ) {
          this.selectFilterList = [
            ...this.selectFilterList,
            { id: this.selectFilterList.length, bo: value, bgs: [] },
          ];
          this.addInfoTable[index].bo = value;
        }
        break;
      case 'bg':
        if (this.bgDataList.filter((item) => item.bg === value).length <= 0) {
          this.bgDataList = [
            ...this.bgDataList,
            { id: this.bgDataList.length, bg: value },
          ];
          this.addInfoTable[index].bg = value;
        }
        break;
      default:
        break;
    }
  }

  // 判斷資料是否為空
  isEmpty() {
    if (isEmpty(this.addInfoTable)) return true;
    return this.addInfoTable.some((item: AddInfo) => {
      return (
        item.bo.trim() === '' || item.bu.trim() === '' || item.bg.trim() === ''
      );
    });
  }

  // 成功新增
  handleOk() {
    this.isVisible = false;
    const addDataList = this.addInfoTable.map((item) => {
      return {
        bo: item.bo.toUpperCase(),
        bg: item.bg.toUpperCase(),
        bu: item.bu.toUpperCase(),
      };
    });
    const data = uniqWith(addDataList, isEqual);
    this.addDataScription$$ = this.ipmServer
      .addBasicData(data)
      .subscribe(async (resp: any) => {
        if (resp.body?.msg === 'exist') {
          this.util.pagePrompt('error', 'messages.cannotRepeat');
          return;
        } else if ([200].includes(resp.status)) {
          this.util.pagePrompt('success', 'notice.newSuccess');
        } else {
          this.util.pagePrompt('error', 'notice.newFail');
          return;
        }
        this.handleCancel();
        this.tableInfo.pageIndex = 1;
        // 獲取最新的資料
        this.initDataList();
      });
  }

  handleCancel() {
    this.tableInfo.loading = false;
    this.isVisible = false;
  }

  delBasic(id: number) {
    const obj = this.EnterpriseData.filter((item) => item.id === id)[0];
    const modal: NzModalRef = this.modal.create({
      nzContent: this.translate.instant('messages.sureDel', {
        keyValue: `<span>${this.translate.instant('tableHead.bu')}</span>`,
        basicList: `<br /><span class="font_weight_600 danger_color">${obj.bu}</span>`,
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
              this.delBuScription$$ = this.ipmServer
                .delBuData(id)
                .subscribe(async (resp) => {
                  resolve();
                  if ([204].includes(resp.status)) {
                    this.util.pagePrompt('success', 'notice.deleteSuccess');
                    this.EnterpriseData = this.EnterpriseData.filter(
                      (item) => item.id !== id
                    );
                    this.tableInfo.pageIndex = 1;
                    isEmpty(this.EnterpriseData)
                      ? (this.EnterpriseData = await this.getDataList({
                          filter: JSON.stringify({
                            limit: this.tableInfo.pageSize,
                            skip:
                              (this.tableInfo.pageIndex - 1) *
                              this.tableInfo.pageSize,
                            fields,
                            include: [
                              {
                                relation: 'bgs',
                                scope: {
                                  fields,
                                  include: [
                                    {
                                      relation: 'bus',
                                      scope: {
                                        fields,
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          }),
                        }))
                      : null;
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

  tablePageIndexChange() {}

  // 获取并处理最新资料
  getDataList(params: any) {
    return new Promise<BasicDataRules[]>((resolve, reject) => {
      this.subscription$$ = this.ipmServer
        .getBasicData<BasicAllData>(params)
        .subscribe((resp) => {
          resolve(this.basicServer.arrayMerge(resp));
        });
    });
  }

  async initDataList() {
    this.tableInfo.loading = true;
    const limit = this.tableInfo.pageSize;
    const skip = (this.tableInfo.pageIndex - 1) * this.tableInfo.pageSize;
    const params = {
      filter: JSON.stringify({
        limit,
        skip,
        fields,
        include: [
          {
            relation: 'bgs',
            scope: {
              fields,
              include: [
                {
                  relation: 'bus',
                  scope: {
                    fields,
                  },
                },
              ],
            },
          },
        ],
      }),
    };
    this.EnterpriseData = await this.getDataList(params);
    this.tableInfo.loading = false;
  }

  ngOnInit() {
    this.util.setPageSize().then(() => {
      this.tableInfo.pageSize = Math.floor(
        (this.dataTable?.nativeElement.clientHeight - 64 - 48) / 50
      );
      this.initDataList();
      this.tableInfo.pageTotal = this.EnterpriseData.length;
      this.addInfoTable = addInfoTable;
    });
  }

  /* 自動刪除訂閱，需要實現OnDestory方法 */
  ngOnDestroy(): void {}
}
