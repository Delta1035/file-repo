import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ImpDivision } from '@commonDefine/imp-division.model';
import { Division } from '@commonDefine/pms/division';
import { SelectOption } from '@commonDefine/pms/select-option';
import { UserGroup } from '@commonDefine/pms/user-group';
import { UserProject } from '@commonDefine/pms/user-project';
import { tableColumnsTypes } from '@commonDefine/tableColumnsTypes';
import { DivisionService } from '@commonService/pms/division.service';
import { JiraUserService } from '@commonService/pms/jira-user.service';
import { TranslateService } from '@ngx-translate/core';
import { NzDrawerOptions, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalOptions, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { JiraUser } from './../../define/pms/jira-user';
import { UploadedUserAdapter } from './adapter';
import { UploadedUserBuilder } from './builder';
import { ACCOUNT_STATUS } from './constant/ACCOUNT_STATUS';
import { JIRA_GROUP } from './constant/jira-group';
import { JIRA_USER_TABLE_HEADER } from './constant/JIRA_USER_TABLE';
import { ORG_ROLE_LIST } from './constant/ORG_ROLE_LIST';
import { UserReportVaildatedProxy } from './proxy';
import { PmsExistDivisionValidator, PmsUserFieldValidator } from './validator';
import * as XLSX from 'xlsx-with-styles';

export interface CustomNzDrawerOptions extends NzDrawerOptions {
  nzSize: 'default' | 'large';
}
@Component({
  selector: 'app-pms-user-management',
  templateUrl: './pms-user-management.component.html',
  styleUrls: ['./pms-user-management.component.scss'],
})
export class PmsUserManagementComponent implements OnInit {
  subTitle = '';
  validateForm!: FormGroup;
  // 用户名是否为空
  get isUserNameEmpty() {
    return this.userName.trim() === '';
  }
  // 是否在添加新的用户
  isAddUserMode = false;
  // 编辑用户信息
  // 编辑模态框
  editModalInfo = {
    editUserInfo: {
      id: 0,
      user_name: '',
      employee_id: '',
      email: '',
      division: '',
      statusDescription: '',
      status: 1,
    } as JiraUser,
    isEditModalVisible: false,
  };
  JIRA_USER_TABLE_HEADER = JIRA_USER_TABLE_HEADER;
  ACCOUNT_STATUS = ACCOUNT_STATUS;
  ACCOUNT_STATUS2 = ACCOUNT_STATUS.slice(1);
  JIRA_GROUP = JIRA_GROUP;
  ORG_ROLE_LIST = ORG_ROLE_LIST;
  divisionList: Division[] = [];
  DEVISION_LIST: SelectOption[] = [];

  @ViewChild('modalContent')
  modalContent!: TemplateRef<any>;
  @ViewChild('detailTemplateRef')
  detailTemplateRef!: TemplateRef<any>;
  constructor(
    public title: Title,
    public translate: TranslateService,
    private message: NzMessageService,
    private jiraUserService: JiraUserService,
    private divisionService: DivisionService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private fb: FormBuilder,
    private drawerService: NzDrawerService
  ) {
    this.title.setTitle(
      this.translate.instant('home.pmsUserManagement') +
        ' - ' +
        this.translate.instant('title')
    );
    this.subTitle = this.route.snapshot.data.subTitle;
  }

  async ngOnInit(): Promise<void> {
    // this.getUserList();
    this.apid = 'PMS.ADDJIRAUSER';
    await this.getDivList();
    this.division = await this.divisionService.find();
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
  private division: ImpDivision[] = [];
  apid: string = '';
  jiraDataSource: JiraUser[] = [];
  tableColumns: tableColumnsTypes[] = [];
  tableColumnsWidth: any;
  displayedColumns: string[] = [];
  selectIndex = 0;
  userName = 'delta';
  userStatus = 1;
  jiraGroup = '';
  isLoading = false;
  selectUser?: JiraUser;
  selectUserProject: UserProject[] = [];
  projectTableColumns: tableColumnsTypes[] = [];
  isProjectLoading = false;
  selectUserGroup: UserGroup[] = [];
  groupTableColumns: tableColumnsTypes[] = [];
  isGroupLoading = false;

  initForm() {
    const userInfo = this.editModalInfo.editUserInfo;
    this.validateForm = this.fb.group({
      user_name: [
        this.isAddUserMode ? '' : userInfo.user_name,
        [Validators.required],
      ],
      employee_id: [
        this.isAddUserMode ? '' : userInfo.employee_id,
        [Validators.required],
      ],
      email: new FormControl(this.isAddUserMode ? '' : userInfo.email),
      division: new FormControl({
        value: this.isAddUserMode ? '' : userInfo.division,
        disabled: this.isAddUserMode ? false : true,
      }),
      org_role: new FormControl(this.isAddUserMode ? '' : userInfo.org_role),
      status: [this.isAddUserMode ? 1 : userInfo.status],
    });

    this.validateForm.get('status')?.valueChanges.subscribe((status: 1 | 2) => {
      if (status === 2) {
        const modal: NzModalRef = this.modal.create({
          nzTitle: this.translate.instant('common.tooltip.delete'),
          nzContent: this.translate.instant('PMS.Guide.deleteUser'),
          nzClosable: false,
          nzMaskClosable: false,
          nzCentered: true,
          nzCancelText: this.translate.instant('common.CANCEL'),
          nzOkText: this.translate.instant('common.CONFIRM'),
          nzOnOk: () => modal.destroy(),
          nzOnCancel: () => {
            this.validateForm.patchValue({
              status: 1,
            });
          },
        });
      }
    });
  }

  getObjectKeys(object: Object) {
    return Object.keys(object);
  }

  // 添加User數據
  addJiraUser(): void {
    this.isAddUserMode = true;
    this.initForm();
    const modalConfig: ModalOptions = {
      nzTitle: this.translate.instant('common.ADD'),
      nzContent: this.modalContent,
      nzCentered: true,
      nzFooter: [
        {
          label: this.translate.instant('common.CANCEL'),
          onClick: () => modalRef.destroy(),
        },
        {
          label: this.translate.instant('common.CONFIRM'),
          type: 'primary',
          onClick: () => {
            return new Promise((resolve, reject) => {
              const jiraUser: JiraUser = Object.assign(this.validateForm.value);
              this.jiraUserService
                .createUser(jiraUser)
                .then((result) => {
                  if (result.length != 0) {
                    // 添加成功
                    this.getUserList();
                    this.message.success(this.translate.instant('common.messages.UPDATESUCCESS'));
                  } else {
                    this.message.error(this.translate.instant('common.tooltip.addUserError'));
                  }
                })
                .finally(() => {
                  resolve(null);
                  modalRef.destroy();
                });
            });
          },
        },
      ],
    };
    const modalRef = this.modal.create(modalConfig);
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
    this.divisionList.forEach((div) => {
      const selectOption: SelectOption = {
        optionValue: div.div,
        optionLabel: div.div,
        disabled: false,
      };
      this.DEVISION_LIST.push(selectOption);
    });
  }

  // 点击查询
  async getUserList() {
    this.isLoading = true;
    const result = await this.jiraUserService.getJiraUser({
      userName: this.userName,
      status: +this.userStatus,
      jiraGroup: this.jiraGroup,
    });
    // const result = await this.getMockJiraUserList();
    if (result.length == 0) {
      // 沒有查詢到
      this.message.error(this.translate.instant('common.messages.notFound'));
      this.jiraDataSource = [];
      this.jiraDataSource = this.jiraDataSource.slice(0);
      this.isLoading = false;
      return;
    }
    this.jiraDataSource = [];
    this.jiraDataSource = result;
    this.jiraDataSource = this.jiraDataSource.slice(0);
    this.formatData();
    this.selectIndex = 1;
    this.isLoading = false;
    console.log('jiraDataSource', this.jiraDataSource);
  }

  formatData() {
    this.jiraDataSource.forEach((element) => {
      this.translate
        .get(`JIRAUSER.Status.${element.status}`)
        .subscribe((res: string) => {
          element.statusDescription = res;
        });
      this.translate
        .get(`JIRAUSER.OrgRole.${element.org_role ? element.org_role : 'None'}`)
        .subscribe((res: string) => {
          element.org_roleDescription = res;
        });
      // console.log(element.project_list);
      element.project_list?.forEach((project) => {
        element.projects = `${element.projects ? `${element.projects}/` : ``}${
          project.project_name
        }`;
      });
    });
  }

  userEditModalClose() {
    this.editModalInfo.isEditModalVisible = false;
  }
  // 更新指定Item
  updateUser(ele: JiraUser) {
    console.log('ele', ele);
    this.isAddUserMode = false;
    this.editModalInfo.editUserInfo = ele;
    this.editModalInfo.isEditModalVisible = true;
    this.initForm();
    const modalConfig: ModalOptions = {
      nzTitle: this.translate.instant('common.ADD'),
      nzContent: this.modalContent,
      nzCentered: true,
      nzFooter: [
        {
          label: this.translate.instant('common.CANCEL'),
          onClick: () => modalRef.destroy(),
        },
        {
          label: this.translate.instant('common.CONFIRM'),
          type: 'primary',
          onClick: () =>
            new Promise(async (resolve) => {
              console.log('ok', this.validateForm);
              const res = await this.jiraUserService.updateUser(
                ele.id,
                Object.assign(this.validateForm.value, {
                  id: 0 /**编辑的时候id固定为0*/,
                  org_role: this.validateForm.controls.org_role.value,
                  email: this.validateForm.controls.email.value,
                  status: this.validateForm.controls.status.value.toString(),
                })
              );
              if (Object.keys(res).length == 0) {
                // 更新失敗
                this.message.error('common.messages.UPDATEFAIL');
                resolve(0);
              }
              this.getUserList();
              this.message.success('success');
              modalRef.destroy();
            }),
        },
      ],
    };
    const modalRef = this.modal.create(modalConfig);
  }

  // 重置刷新tale
  resetTable() {
    this.getUserList();
  }

  selectTabChange(e: any) {
    this.selectIndex = e.index;
    if (this.selectIndex === 1) {
      this.getUserList();
      this.selectUser = undefined;
      this.selectUserGroup = [];
      this.selectUserProject = [];
    } else if (this.selectIndex === 0) {
      this.selectUser = undefined;
      this.selectUserGroup = [];
      this.selectUserProject = [];
    }
  }

  isNull() {
    if (this.userName.trim() == undefined) {
      return true;
    }
    return false;
  }

  doUploadFile(uploadElement: HTMLInputElement) {
    uploadElement.click();
  }

  async onUploadedFileChanged(inputEvent: any): Promise<void> {
    const files = inputEvent.target.files;
    const data: any = await new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      let workbook: XLSX.WorkBook;
      fileReader.readAsArrayBuffer(files[0]);
      fileReader.onerror = (ev) => {
        console.log('加载失败', ev);
      };
      fileReader.onloadend = (ev) => {
        const data: ArrayBuffer = ev.target?.result as ArrayBuffer;
        workbook = XLSX.read(data, {
          type: 'array',
          cellDates: true,
          cellStyles: true,
        });
        const result = workbook.SheetNames.map(SheetName=>{
          return XLSX.utils.sheet_to_json(workbook.Sheets[SheetName])
        })
        resolve(result);
      };
    });
    this.isLoading = true;
    const [users] = data;
    const builder = new UploadedUserBuilder();
    const validators = [
      new PmsUserFieldValidator(),
      new PmsExistDivisionValidator(this.division),
    ];

    try {
      const uploadedData = new UserReportVaildatedProxy(builder, validators)
        .addUsers(users.map((user: any) => new UploadedUserAdapter(user)))
        .build();
      await this.jiraUserService
        .upsertUser(uploadedData)
        .then(() => this.getUserList());

      this.message.success('上傳成功');
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
      if (error instanceof Error) {
        if (error.message.match(/missing required field:/g)) {
          const missingField = error.message.replace(
            /missing required field: /g,
            ''
          );
          this.message.error(`缺少欄位 ${missingField}`);
        } else if (error.message.match(/^Division(.*)not exist/g)) {
          const unExistDivision = error.message
            .replace(/Division /g, '')
            .replace(/ not exist/g, '');
          this.message.error(`處級 ${unExistDivision} 不存在`);
        }
      } else {
        this.message.error('上傳失敗');
      }
    }
  }

  showDetail(ele: JiraUser) {
    const drawerRef = this.drawerService.create({
      nzWidth: '50%',
      nzTitle: this.translate.instant('common.tooltip.detail'),
      nzContent: this.detailTemplateRef,
      nzContentParams: {
        value: ele,
      },
    });
  }

  // 进入用户详情
  goToDetail(ele: JiraUser) {
    this.selectIndex = 2;
    this.selectUser = ele;
    // console.log(this.selectUser.user_name);
    this.isProjectLoading = true;
    // this.initProjectTableCloumns();
    this.selectUserProject = this.selectUser.project_list
      ? this.selectUser.project_list
      : [];
    this.selectUserProject.forEach((element) => {
      this.translate
        .get(`PMS.projectRole.${element.project_role}`)
        .subscribe((res: string) => {
          element.project_roleDescription = res;
        });
      this.translate
        .get(`PMS.jiraRole.${element.jira_role}`)
        .subscribe((res: string) => {
          element.jira_roleDescription = res;
        });
    });
    this.isProjectLoading = false;
    console.log(this.selectUser.jira_user_group);
    this.isGroupLoading = true;
    // this.initJiraGroupTableCloumns();
    this.selectUserGroup = this.selectUser.jira_user_group
      ? this.selectUser.jira_user_group
      : [];

    this.isGroupLoading = false;
  }
}
