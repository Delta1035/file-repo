import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  AddList,
  Country,
  Permission,
  TableInfo,
  TssCal,
  Years,
} from '@commonDefine/index';
import { IpmApiService } from '@commonService/ipm-api.service';
import { PermissionsService } from '@commonService/permissions.service';
import { AutoUnsubscrb } from '@commonUtils/autounsubscrb/autounsubscrb';
import { UtilsService } from '@commonUtils/index';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep, throttle } from 'lodash';
import moment from 'moment';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { tableColumns, countrys, addInfoTable } from './constance';

@AutoUnsubscrb()
@Component({
  selector: 'app-basic-data-tss-cal',
  templateUrl: './basic-data-tss-cal.component.html',
  styleUrls: ['./basic-data-tss-cal.component.scss'],
})
export class BasicDataTssCalComponent implements OnInit, OnDestroy {
  constructor(
    public title: Title,
    public translate: TranslateService,
    private modal: NzModalService,
    private permissionsService: PermissionsService,
    private ipmServer: IpmApiService,
    private util: UtilsService
  ) {
    this.title.setTitle(
      this.translate.instant('home.basicDataTssCal') +
        ' - ' +
        this.translate.instant('title')
    );
  }

  @ViewChild('dataTable', { static: false }) dataTable: ElementRef | undefined;

  pagePermission: Permission =
    this.permissionsService.getPagePermissions('basicDataTssCal');
  // TSS-CAL維護
  TssCalData: TssCal[] = [];
  tableColumns: Array<string> = tableColumns;
  tableInfo: TableInfo = {
    loading: false,
    pageTotal: 0,
    pageIndex: 1,
    pageSize: 10,
    checkedAll: false,
  };
  editCache: { [key: string]: { edit: boolean; data: TssCal } } = {};
  // -------TSS-CAL新增------
  isVisible: boolean = false;
  countrys: Country[] = countrys;
  addInfoTable: AddList[] = [];
  selectedCountry: string = 'TW';
  selectedYear: Date = new Date();
  calSuccessLoading: boolean = false;
  // 搜索栏位
  searchSelectedYear: string = '';
  years: Years[] = [];
  searchKeyWord: string = '';
  searchKeyWordBack: string = '';
  // ------订阅----
  delEtrtnaSub$$!: Subscription;
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
    this.addInfoTable = cloneDeep(addInfoTable);
  }

  // 打开该行修改
  editBasic(id: number) {
    this.editCache[id].edit = true;
  }

  // 取消修改
  cancleSaveBasic(id: number) {
    this.editCache[id].data.day =
      this.TssCalData.find((item) => item.id === id)?.day || 1;
    this.editCache[id].edit = false;
    this.tableInfo.loading = false;
  }

  // 保存tss-cal内容
  saveBasic(id: number) {
    this.tableInfo.loading = true;
    const obj = this.editCache[id].data;
    const modal: NzModalRef = this.modal.create({
      nzContent: this.translate.instant('messages.sureUpdate', {
        TssCalList: `<br /><span class="font_weight_600 danger_color">${
          this.translate.instant('tableHead.country') + ': ' + obj?.country
        }</span><br />
        <span class="font_weight_600 danger_color">${
          this.translate.instant('tableHead.date') +
          ': ' +
          moment(Number(obj?.date)).format('L')
        }</span><br />
        <span class="font_weight_600 danger_color">${
          this.translate.instant('tableHead.day') + ': ' + obj?.day
        }</span>`,
      }),
      nzClassName: 'confirm_delete_modal',
      nzClosable: false,
      nzCentered: true,
      nzFooter: [
        {
          label: this.translate.instant('button.cancel'),
          onClick: () => {
            this.cancleSaveBasic(id);
            modal.destroy();
          },
        },
        {
          label: this.translate.instant('button.confirm'),
          type: 'primary',
          danger: true,
          onClick: async () => {
            const index = this.TssCalData.findIndex((item) => item.id === id);
            // 修改tss-cal内容
            const resp = await this.ipmServer.updateTssCalById(
              id,
              this.editCache[id].data.day
            );
            if ([204].includes(resp.status)) {
              Object.assign(this.TssCalData[index], this.editCache[id].data);
              this.editCache[id].edit = false;
              this.util.pagePrompt('success', 'notice.updateSuccess');
            } else {
              this.util.pagePrompt('error', 'notice.updateFail');
            }
            this.tableInfo.loading = false;
            modal.destroy();
          },
        },
      ],
    });
  }

  // 修改tss-cal内容
  updateEditCache(): void {
    this.TssCalData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  // 选择的年份发生改变
  modelChange(date: Date) {
    const year = date.getFullYear();
    this.addInfoTable = this.addInfoTable.map((item) => {
      return {
        ...item,
        date: new Date(year, item.date.getMonth()),
        year,
      };
    });
  }

  // TSS-CAL取消新增
  handleCancel() {
    this.selectedCountry = 'TW';
    this.selectedYear = new Date();
    this.isVisible = false;
    this.tableInfo.loading = false;
  }

  // 確認新增
  async handleOk() {
    this.tableInfo.loading = true;
    this.calSuccessLoading = true;
    const data = this.addInfoTable.map((item) => {
      return {
        ...item,
        year: item.year.toString(),
        date: item.date.valueOf(),
        country: this.selectedCountry,
      };
    });
    const resp = await this.ipmServer.createTssCal(data);
    this.calSuccessLoading = false;
    if (resp.body.msg === 'exist') {
      this.util.pagePrompt('error', 'messages.cannotRepeat');
      return;
    } else {
      this.tableInfo.pageIndex = 1;
      this.handleCancel();
      this.util.pagePrompt('success', 'notice.newSuccess');
      this.getTssDataList();
    }
  }

  // 获取TssCAL基础数据
  async getTssDataList() {
    this.tableInfo.loading = true;
    const { body, headers, status } = await this.ipmServer.getTssCalList({
      filter: JSON.stringify({
        limit: this.tableInfo.pageSize,
        skip: (this.tableInfo.pageIndex - 1) * this.tableInfo.pageSize,
        order: ['date ASC'],
        where: {
          and: [
            {
              country: {
                ilike: '%' + this.searchKeyWordBack.trim().toUpperCase() + '%',
              },
            },
            {
              year: {
                ilike: '%' + this.searchSelectedYear +'%'
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
    this.TssCalData = body as [];
    this.updateEditCache();
    this.tableInfo.loading = false;
  }

  // 年份选择列表展开
  selectOpen(bool: boolean) {
    bool && this.ipmServer.getYears().subscribe((data) => (this.years = data));
  }

  // 翻页
  tablePageIndexChange() {
    this.getTssDataList();
  }

  ngOnInit() {
    this.util.setPageSize().then(() => {
      this.tableInfo.pageSize = Math.floor(
        (this.dataTable?.nativeElement.clientHeight - 64 - 48) / 50
      );
      this.ipmServer.getYears().subscribe((data) => {
        this.years = data
        this.searchSelectedYear = this.years.find(item=>item.year === new Date().getFullYear().toString())?.year || ''
        this.getTssDataList();
        this.addInfoTable = addInfoTable;
      });
    });
  }

  ngOnDestroy(): void {
    this.dataSearch.cancel();
  }
}
