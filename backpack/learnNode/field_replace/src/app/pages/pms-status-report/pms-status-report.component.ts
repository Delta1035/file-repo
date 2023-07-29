import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '@commonDefine/pms/select-option';
import { UserInJira } from '@commonDefine/pms/user-in-jira.model';
import { tableColumnsTypes } from '@commonDefine/tableColumnsTypes';
import { ReportService } from '@commonService/pms/report.service';
import { UtilitiesService } from '@commonService/pms/utilities.service';
import { ImpTranslateService } from '@commonService/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { STATUS_REPORT_TABLE_HEADER } from './constant/STATUS_REPORT_TABLE';

@Component({
  selector: 'app-pms-status-report',
  templateUrl: './pms-status-report.component.html',
  styleUrls: ['./pms-status-report.component.scss']
})
export class PmsStatusReportComponent implements OnInit {
  subTitle = '';
  ACCOUNT_STATUS: SelectOption[] = [
    {
      optionValue:'-1',
      optionLabel:"USERPROJECTSTATUS.ALL",
      disabled:false
    },
    {
      optionValue:'0',
      optionLabel:"USERPROJECTSTATUS.ERROR",
      disabled:false
    },
    {
      optionValue:'1',
      optionLabel:"USERPROJECTSTATUS.NORMAL",
      disabled:false
    }
  ];
  tableHeaders = STATUS_REPORT_TABLE_HEADER;
  constructor(
    public title: Title,
    public translate: TranslateService,
    private reportService: ReportService,
    private message: ImpTranslateService,
    private utilServer: UtilitiesService,
    private route: ActivatedRoute
  ) {
    this.title.setTitle(this.translate.instant('home.pmsStatusReport') + ' - ' + this.translate.instant('title'));
    this.subTitle = this.route.snapshot.data.subTitle;

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
  userStatusDataSource: UserInJira[] = [];
  tableColumns: tableColumnsTypes[] = [];
  tableColumnsWidth: any;
  displayedColumns: string[] = [];
  selectIndex = 0;
  userName = '';
  projectName = '';
  userStatus = '0';
  isLoading = false;

  // 点击查询
  async getUserInJira() {
    this.isLoading = true;
    const result = await this.reportService.getUserInJira(
      this.projectName,
      this.userName,
      ['site_admin']
    );
    if (result.length == 0) {
      // 沒有查詢到
      this.message.error('common.messages.notFound');
      this.userStatusDataSource = [];
      this.userStatusDataSource = this.userStatusDataSource.slice(0);
      this.isLoading = false;
      return;
    }
    this.userStatusDataSource = [];
    if (this.userStatus === "-1") {
      this.userStatusDataSource = result;
    } else if (this.userStatus === "0") {
      this.userStatusDataSource = result.filter((x: any) => x.status !== 0);
    } else if (this.userStatus === "1") {
      this.userStatusDataSource = result.filter((x: any) => x.status === 0);
    }
    this.userStatusDataSource = this.userStatusDataSource.slice(0);
    this.formatData();
    this.selectIndex = 1;
    this.isLoading = false;
  }

  formatData() {
    this.userStatusDataSource.forEach((element) => {
      if (element.project_role) {
        this.translate
          .get(`PMS.projectRole.${element.project_role}`)
          .subscribe((res: string) => {
            element.project_roleDescription = res;
          });
      }
      this.translate
        .get(`USERPROJECTSTATUS.${element.status}`)
        .subscribe((res: string) => {
          element.statusDescription = res;
        });
    });
    console.log(this.userStatusDataSource);
  }

  // 重置刷新tale
  resetTable() {
    this.getUserInJira();
  }

  selectTabChange(e: any) {
    this.selectIndex = e.index;
    if (this.selectIndex === 1) {
      this.getUserInJira();
    } else if (this.selectIndex === 0) { }
  }

  // 初始化tableCloumns
  async initTableCloumns() {
    const { tableColumnsTypes, tableColumnsWidth } = await this.utilServer.readyJson('assets/constant/pms/user-project-status-report-columns.json')
    this.tableColumns = tableColumnsTypes;
    this.tableColumnsWidth = tableColumnsWidth;
  }

  isNull() {
    if (this.userName.trim() == undefined) {
      return true;
    }
    return false;
  }

  async ngOnInit(): Promise<void> {
    // this.getUserList();
    this.initTableCloumns();
    this.apid = 'PMS.USERPROJECTSTATUSREPORT';
    this.getUserInJira();
  }
}
