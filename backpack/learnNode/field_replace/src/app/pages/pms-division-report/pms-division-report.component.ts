import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Division } from '@commonDefine/pms/division';
import { SelectOption } from '@commonDefine/pms/select-option';
import { UserProjectDivision } from '@commonDefine/pms/user-project-division.model';
import { tableColumnsTypes } from '@commonDefine/tableColumnsTypes';
import { DivisionService } from '@commonService/pms/division.service';
import { ReportService } from '@commonService/pms/report.service';
import { UtilitiesService } from '@commonService/pms/utilities.service';
import { ImpTranslateService } from '@commonService/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { DIVISION_REPORT_TABLE_HEADER } from './constant/DIVISION_REPORT_TABLE';

@Component({
  selector: 'app-pms-division-report',
  templateUrl: './pms-division-report.component.html',
  styleUrls: ['./pms-division-report.component.scss']
})
export class PmsDivisionReportComponent implements OnInit {
  subTitle = '';
  tableHeaders = DIVISION_REPORT_TABLE_HEADER;
  DEVISION_LIST:SelectOption[] = [];
  constructor(
    public title: Title,
    public translate: TranslateService,
    private reportService: ReportService,
    private message: ImpTranslateService,
    private utilServer: UtilitiesService,
    private route: ActivatedRoute,
    private divisionService: DivisionService,
  ) {
    this.subTitle = this.route.snapshot.data.subTitle;
    this.title.setTitle(this.translate.instant(this.subTitle) + ' - ' + this.translate.instant('title'));

   }
 /*
    apid：
    userStatusDataSource
    tableColumns：默認表格列顯示表頭
    content: 發送給dialog-component的內容
    minlength：輸入框最少輸入字符
    maxlength：输入框最多输入字符
    selectIndex：table選擇的下標
    displayedColumns：col列的顯示
    searchVal: 搜索內容
*/
  // content: string = '';
  apid: string = '';
  userProjectDivisionDataSource: UserProjectDivision[] = [];
  tableColumns: tableColumnsTypes[] = [];
  tableColumnsWidth: any;
  displayedColumns: string[] = [];
  selectIndex = 0;
  division?: string;
  divisionList: Division[] = [];
  fromDate?: Date;
  toDate?: Date;
  isLoading = false;

  async ngOnInit(): Promise<void> {
    this.iniDate();
    this.getDivList();
    this.initTableCloumns();
    this.apid = 'PMS.USERPROJECTDIVISIONREPORT';
    this.getUserProject();
  }

  iniDate() {
    const today = new Date();
    this.fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this.toDate = new Date();
  }

  async getDivList() {
    const result = await this.divisionService.getDivision();
    if (result.length == 0) {
      // 沒有查詢到
      this.message.error('No Division List!');
      this.divisionList = [];
      return;
    }
    this.divisionList = [];
    this.divisionList = result;
    this.divisionList.unshift({ div: '', div_group: '', functions: '' });
    this.DEVISION_LIST = [];
    this.divisionList.forEach(div => {
      const selectOption: SelectOption = {
        optionValue: div.div,
        optionLabel: div.div,
        disabled: false
      }
      this.DEVISION_LIST.push(selectOption);
    })
    console.log('divisionList', this.divisionList);
  }

  // 点击查询
  async getUserProject() {
    this.isLoading = true;
    const result = await this.reportService.getUserProject(
      this.fromDate?.toLocaleDateString(),
      this.toDate?.toLocaleDateString(),
      this.division,
    );
    if (result.length == 0) {
      // 沒有查詢到
      this.message.error('common.messages.notFound');
      this.userProjectDivisionDataSource = [];
      this.userProjectDivisionDataSource = this.userProjectDivisionDataSource.slice(0);
      this.isLoading = false;
      return;
    }
    this.userProjectDivisionDataSource = [];
    this.userProjectDivisionDataSource = result;
    this.userProjectDivisionDataSource = this.userProjectDivisionDataSource.slice(0);
    this.formatData();
    this.selectIndex = 1;
    this.isLoading = false;
  }

  formatData() {
    this.userProjectDivisionDataSource.forEach((element) => {
    });
    console.log(this.userProjectDivisionDataSource);
  }

  // 重置刷新tale
  resetTable() {
    this.getUserProject();
  }

  selectTabChange(e: any) {
    this.selectIndex = e.index;
    if (this.selectIndex === 1) {
      this.getUserProject();
    } else if (this.selectIndex === 0) { }
  }

  // 初始化tableCloumns
  async initTableCloumns() {
    const { tableColumnsTypes, tableColumnsWidth } = await this.utilServer.readyJson('assets/constant/pms/user-project-division-report-columns.json')
    this.tableColumns = tableColumnsTypes;
    this.tableColumnsWidth = tableColumnsWidth;
  }

  isNull() {
    return false;
  }

}
