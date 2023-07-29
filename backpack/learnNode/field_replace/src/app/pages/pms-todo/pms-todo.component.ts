import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Sign, SignDetail } from '@commonDefine/pms/sign';
import { tableColumnsTypes } from '@commonDefine/tableColumnsTypes';
import { PermissionsService } from '@commonService/permissions.service';
import { SignService } from '@commonService/pms/sign.service';
import { UtilitiesService } from '@commonService/pms/utilities.service';
import { ImpTranslateService } from '@commonService/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Subject } from 'rxjs';
import { PROJECT_PROCESS_STATUS } from './constant/PROJECT_PROCESS_STATUS';
import { SIGN_TABLE_CELL, SIGN_TABLE_HEADER } from './constant/SIGN_TABLE';
import { ProjectProcessDetailComponent } from './project-process-detail/project-process-detail.component';

@Component({
  selector: 'app-pms-todo',
  templateUrl: './pms-todo.component.html',
  styleUrls: ['./pms-todo.component.scss'],
})
export class PmsTodoComponent implements OnInit {
  subTitle = '';
  PROJECT_STATIS = PROJECT_PROCESS_STATUS;
  tableHeaders = SIGN_TABLE_HEADER;
  tableKeys = SIGN_TABLE_CELL;
  @ViewChild('operationTemplateRef')
  operationTemplateRef!: TemplateRef<any>;
  approveSubject: Subject<any> | undefined = new Subject();
  constructor(
    public title: Title,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private signService: SignService,
    private message: ImpTranslateService,
    private utilServer: UtilitiesService,
    private permission: PermissionsService,
    private drawerService: NzDrawerService
  ) {
    this.title.setTitle(this.translate.instant('home.pmsTodo') + ' - ' + this.translate.instant('title'));
    this.subTitle = this.route.snapshot.data.subTitle;
    console.log('subTitle', this.subTitle);

  }

  /*
    apid：
    jiraDataSource
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
  signDataSource: Sign[] = [];
  tableColumns: tableColumnsTypes[] = [];
  tableColumnsWidth: any;
  displayedColumns: string[] = [];
  selectIndex = 0;
  isLoading = false;
  selectSign?: Sign;
  showApprove: boolean = false;
  signId: string = '';
  signResult: string = 'OPEN';
  loginEmail: string = '';
  startDate: any;
  endDate: any;

  signDetails: SignDetail[] = [];

  // 点击查询
  async getApproveList() {
    this.isLoading = true;
    const result = await this.signService.getApproveList(
      this.permission.userInfo.email,
      this.signId,
      this.signResult,
      this.startDate ? this.startDate.toLocaleDateString() : undefined,
      this.endDate ? this.endDate.toLocaleDateString() : undefined,
    );
    if (!result.data || result.data.length == 0) {
      // 沒有查詢到
      this.message.error('common.messages.notFound');
      this.signDataSource = [];
      this.signDataSource = this.signDataSource.slice(0);
      this.isLoading = false;
      this.selectIndex = 1;
      return;
    }
    this.signDataSource = [];
    this.signDataSource = result.data;
    this.signDataSource = this.signDataSource.slice(0);
    this.formatData();
    this.selectIndex = 1;
    this.isLoading = false;
  }

  formatData() {
    this.signDataSource.forEach((element: any) => {
      element.project_name = element.project[0].project_name;
      element.plan_start = element.project[0].plan_start;
      element.plan_end = element.project[0].plan_end;
      element.user_contact_name = element.project[0].user_contact[0].user_name;
      element.it_contact_name = element.project[0].it_contact[0].user_name;
    });
  }

  async ngOnInit(): Promise<void> {
    // this.getUserList();
    this.apid = 'PMS.WAITINGFORAPPROVE';
    this.loginEmail = this.permission.userInfo.email;
    this.getApproveList();
  }

  // 展开处理详情区域
  showDetailDrawer(ele: Sign) {
    const drawerRef = this.drawerService.create<ProjectProcessDetailComponent, { ele: Sign }, string>({
      nzTitle: this.translate.instant('PMS.detail'),
      nzWidth: '75%',
      nzContent: ProjectProcessDetailComponent,
      nzContentParams: {
        isTODO:true,
        selectSign: this.selectSign,
        signDetails: this.signDetails,
        showApprove: this.showApprove,
        approveSubject: this.approveSubject
      }
    })

    this.approveSubject?.subscribe(observer => {
      const { approved, remark } = JSON.parse(observer);
      this.approve(approved, remark)
    })
  }

  async switchToApproveDetail(ele: Sign) {
    await this.getApproveDetail(ele, "OPEN");
    this.showApprove = true;
    this.selectIndex = 2;
    this.showDetailDrawer(ele);
  }

  async switchToDetail(ele: Sign) {
    await this.getApproveDetail(ele);
    this.showApprove = false;
    this.selectIndex = 2;
    this.showDetailDrawer(ele);
  }

  async getApproveDetail(ele: Sign, status?: string) {
    this.isLoading = true;
    const result = await this.signService.getApproveList(
      this.loginEmail ? this.loginEmail : '',
      ele.sign_id,
      status,
    );
    if (!result.data || result.data.length == 0) {
      // 沒有查詢到
      this.message.error('common.messages.notFound');
      this.selectSign = undefined;
      this.isLoading = false;
      return;
    }
    this.selectSign = result.data[0];
    this.signDetails = this.selectSign.sign_detail ?? [];
    this.isLoading = false;
  }

  async approve(approved: string, remark: string) {
    console.log('approve', approved, remark);

    if (!this.selectSign) return;
    this.isLoading = true;
    const result = await this.signService.submitApprove(
      this.selectSign.id,
      this.loginEmail ?? '',
      approved,
      remark,
    );

    if (result.success) {
      this.getApproveList();
      this.message.success("Submit Successfully!");
      this.isLoading = false;
    } else {
      this.message.error("Submit Error: " + result.msg);
      this.isLoading = false;
    }
  }
}
