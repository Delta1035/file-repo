import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewRef,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Division } from '@commonDefine/pms/division';
import { JiraUser } from '@commonDefine/pms/jira-user';
import { Project } from '@commonDefine/pms/project';
import { ProjectUser } from '@commonDefine/pms/project-user';
import { ProjectRepo } from '@commonDefine/pms/projectRepo';
import { SelectOption } from '@commonDefine/pms/select-option';
import { Sign } from '@commonDefine/pms/sign';
import { tableColumnsTypes } from '@commonDefine/tableColumnsTypes';
import { UpsertResponse } from '@commonDefine/upsert-response.model';
import { PermissionsService } from '@commonService/permissions.service';
import { DivisionService } from '@commonService/pms/division.service';
import { ExcelReporterService } from '@commonService/pms/excel-reporter.service';
import { JiraUserService } from '@commonService/pms/jira-user.service';
import { ProjectService } from '@commonService/pms/project.service';
import { SignService } from '@commonService/pms/sign.service';
import { ImpTranslateService } from '@commonService/translate.service';
import { UtilsService } from '@commonUtils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { ProjectProcessDetailComponent } from '@pages/pms-todo/project-process-detail/project-process-detail.component';
import { ACCOUNT_STATUS } from '@pages/pms-user-management/constant/ACCOUNT_STATUS';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {
  UploadedProjectAdapter,
  UploadedVersionAdapter,
  UploadedMemberAdapter,
  ProjectReportAdapter,
} from './adapter';
import { AddJiraProjectModalComponent } from './add-jira-project-modal/add-jira-project-modal.component';
import { AddJiraUserModalComponent } from './add-jira-user-modal/add-jira-user-modal.component';
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';
import { UploadedProjectBuilder } from './builder';
import { PROJECT_STATIS } from './constant/PROJECT_STATUS';
import { PROJECT_TABLE_HEADER } from './constant/PROJECT_TABLE';
import { ProjectReportValidatedProxy } from './proxy';
import { SendToApproveModalComponent } from './send-to-approve-modal/send-to-approve-modal.component';
import {
  PmsInvolveDateValidator,
  JiraUserExistValidator,
  DuplicatedJiraKeyValidator,
  POTLExistValidator,
} from './validator';
import * as XLSX from 'xlsx-with-styles';
import { PROJECT_REPORT_HEADER } from './constant/project-report-header.constant';

@Component({
  selector: 'app-pms-project-management',
  templateUrl: './pms-project-management.component.html',
  styleUrls: ['./pms-project-management.component.scss'],
})
export class PmsProjectManagementComponent implements OnInit {
  DEVISION_LIST: SelectOption[] = [];

  subTitle = '';
  div = ''; // 处级
  // isClosedProject = 'false'; // 是否是关闭的专案
  isClosedProject = 'false'; // 是否是关闭的专案

  ACCOUNT_STATUS = ACCOUNT_STATUS;
  PROJECT_STATIS = PROJECT_STATIS;
  // 表格數據
  tableHeaders = PROJECT_TABLE_HEADER;
  @ViewChild('addProjectTemplate')
  addProjectTemplate!: TemplateRef<any>;
  /*
  apid：
  projectDataSource
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
  allProject: Project[] = [];
  projectDataSource: Project[] = [];
  tableColumns: tableColumnsTypes[] = [];
  displayedColumns: string[] = [];
  selectIndex = 0;
  // TODO 避免数据太多,响应太慢
  projectName = 'dams';
  userStatus = '1';
  isLoading = false;
  divisionList: Division[] = [];
  division: string = '';
  closeProject: string = 'false';
  selectProject?: Project;
  selectProjectRepo: ProjectRepo[] = [];
  vcTableColumns: tableColumnsTypes[] = [];
  isVCLoading = false;
  selectProjectUser: ProjectUser[] = [];
  userTableColumns: tableColumnsTypes[] = [];
  isUserLoading = false;
  // jiraUserList: JiraUser[] = [];

  constructor(
    public title: Title,
    public translate: TranslateService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private jiraUserService: JiraUserService,
    private projectService: ProjectService,
    private message: ImpTranslateService,
    private divisionService: DivisionService,
    private excel: ExcelReporterService,
    private signService: SignService,
    private modal: NzModalService,
    private http: HttpClient,
    private drawerService: NzDrawerService,
    private permission: PermissionsService,
    private utils: UtilsService
  ) {
    this.title.setTitle(
      this.translate.instant('home.pmsProjectManagement') +
        ' - ' +
        this.translate.instant('title')
    );
    this.subTitle = this.route.snapshot.data.subTitle;
  }

  ngOnInit(): void {
    this.getDivList();
    this.apid = 'PMS.PROJECT';
    console.log(this.apid);
    // this.getProjectList();
  }

  async getDivList() {
    const result: Division[] = await this.divisionService.getDivision();
    if (result.length == 0) {
      this.message.error('No Division List!');
      this.DEVISION_LIST = [];
      return;
    }
    this.DEVISION_LIST.splice(0);
    result.unshift({ div: '', div_group: '', functions: '' });
    result.forEach((div) => {
      const selectOption: SelectOption = {
        optionValue: div.div,
        optionLabel: div.div,
        disabled: false,
      };
      this.DEVISION_LIST.push(selectOption);
    });
  }
  // 更新jira用户状态
  updateReadyToCreateUser(data: Project) {
    const modal = this.modal.create({
      nzWidth: '50vw',
      nzBodyStyle: {
        maxHeight: '70vh',
      },
      nzCentered: true,
      nzTitle: this.translate.instant('PMS.CreateUser'),
      nzContent: AddJiraUserModalComponent,
      nzMaskClosable: true,
      nzClosable: true,
      nzComponentParams: {
        data,
      },
      nzFooter: [
        {
          label: this.translate.instant('common.CANCEL'),
          onClick: () => {
            modal.destroy();
          },
        },
        {
          label: this.translate.instant('PMS.ReadyToCreateUser'),
          type: 'primary',
          onClick: async (componentInstance) => {
            this.processAction(componentInstance, 1, data.id, modal);
          },
        },
        {
          label: this.translate.instant('PMS.NotReadyToCreateUser'),
          type: 'primary',
          onClick: async (componentInstance) => {
            this.processAction(componentInstance, 0, data.id, modal);
          },
        },
      ],
    });
  }

  // 更新创建项目状态
  updateReadyToCreateProject(data: Project) {
    const modal = this.modal.create({
      nzWidth: '50vw',
      nzCentered: true,
      nzTitle: this.translate.instant('PMS.CreatedJiraProject'),
      nzContent: AddJiraProjectModalComponent,
      nzMaskClosable: true,
      nzClosable: true,
      nzComponentParams: {
        data,
      },
      nzFooter: [
        {
          label: this.translate.instant('common.CANCEL'),
          onClick: () => {
            modal.destroy();
            console.log('cancel');
          },
        },
        {
          label: this.translate.instant('PMS.CreatedJiraSuccesfully'),
          type: 'primary',
          loading: false,
          onClick: async (componentInstance) => {
            if (componentInstance)
              this.processAction(componentInstance, 2, data.id, modal);
          },
        },
        {
          label: this.translate.instant('PMS.CreatedJiraFailed'),
          loading: false,
          type: 'primary',
          onClick: async (componentInstance) => {
            if (componentInstance)
              this.processAction(componentInstance, 0, data.id, modal);
          },
        },
      ],
    });
  }

  // 送交签核
  submitToApprove(data: Project) {
    const modal = this.modal.create({
      nzWidth: '50vw',
      nzBodyStyle: {
        maxHeight: '70vh',
      },
      nzCentered: true,
      nzTitle: this.translate.instant('PMS.SubmitToSign'),
      nzContent: SendToApproveModalComponent,
      nzMaskClosable: true,
      nzClosable: true,
      nzComponentParams: {
        data,
      },
      nzFooter: [
        {
          label: this.translate.instant('common.CANCEL'),
          onClick: () => {
            modal.destroy();
            console.log('cancel');
          },
        },
        {
          label: this.translate.instant('PMS.SubmitToSign'),
          loading: false,
          type: 'primary',
          onClick: async (componentInstance) => {
            try {
              const response = await this.signService.submitToApprove(
                data,
                componentInstance?.projectForm.value.remark
              );
              if (response.success) {
                // 修改成功
                this.getProjectList();
                this.message.success('success');
                modal.destroy();
              } else {
                this.message.error('submit to approve error:' + response.msg);
              }
            } catch (error) {
              this.isLoading = false;
              this.getProjectList();
              this.message.error('submit to approve error');
            }
          },
        },
      ],
    });
  }

  editProject(data: any) {
    console.log('data', data);
    this.openProjectModal(data);
  }

  async detail(data: Project) {
    console.log('data', data);
    this.selectProject = data;
    this.isVCLoading = true;
    this.selectProjectRepo = this.selectProject.version_control ?? [];
    this.isVCLoading = false;
    this.isUserLoading = true;
    this.selectProjectUser = this.selectProject.users ?? [];
    this.selectProjectUser.forEach(async (element, index) => {
      const res: string = await this.translate
        .get(`PMS.projectRole.${element.project_role}`)
        .toPromise();
      this.selectProjectUser[index].project_roleDescription = res;
      const res2: string = await this.translate
        .get(`PMS.jiraRole.${element.jira_role}`)
        .toPromise();
      this.selectProjectUser[index].jira_roleDescription = res2;
      this.selectProjectUser[index].jira_user_id = element.jira_user_id
        ? 'Y'
        : 'N';
    });
    console.log('this.selectProjectUser', this.selectProjectUser);

    this.isUserLoading = false;
    const selectSign: Sign = {
      id: 0,
      project: [data],
      sign_id: '',
      result: '',
      requester_remark: '',
      update_users: [...this.selectProjectUser],
      sign_detail: [],
    };
    const drawerRef = this.drawerService.create<
      ProjectProcessDetailComponent,
      { selectProject: Sign },
      string
    >({
      nzWidth: '75%',
      nzTitle: this.translate.instant('PMS.detail'),
      nzContent: ProjectProcessDetailComponent,
      nzContentParams: {
        selectSign,
        isTODO:false
      },
    });
  }

  report() {}

  openProjectModal(data?: Project) {
    const modal = this.modal.create({
      nzWidth: '70vw',
      nzBodyStyle: {
        maxHeight: '70vh',
        'overflow-y': 'scroll',
      },
      nzCentered: true,
      nzTitle: this.translate.instant('common.ADD'),
      nzContent: AddProjectModalComponent,
      nzMaskClosable: false,
      nzClosable: true,
      nzComponentParams: {
        data,
      },
      nzFooter: [
        {
          label: this.translate.instant('common.CANCEL'),
          onClick: () => {
            modal.destroy();
            console.log('cancel');
          },
        },
        {
          label: this.translate.instant('common.CONFIRM'),
          type: 'primary',
          onClick: async (componentInstance) => {
            try {
              this.isLoading = true;
              const form = componentInstance?.projectForm;
              const formValue = form?.value;
              const users = componentInstance?.projectUserTableSource;
              const version_control = componentInstance?.projectRepoTableSource;
              if (form && form.valid) {
                // 表单验证通过才会去提交
                console.log('通过',form, form.value);
                const productType = []
                if(form.value.productTypeProduct)productType.push('Product')
                if(form.value.productTypeModel)productType.push('Model')
                const projectValue:Project  = {
                  id: form.value.id,
                  project_name: form.controls.projectName.value,
                  project_code: form.controls.projectCode.value,
                  division: form.controls.division.value,
                  division_supervisor: form.controls.divisionSupervisor.value,
                  division_supervisor_email: form.controls.divisionSupervisorEmail.value.toUpperCase(),
                  mode: form.controls.projectMode.value,
                  product_type: JSON.stringify(productType),
                  plan_start: form.controls.planStart.value.toLocaleDateString(),
                  plan_end: form.value.planEnd.toLocaleDateString(),
                  jira_key: form.controls.jiraKey.value,
                  jira_name: form.controls.jiraName.value,
                  user_contact: form.value.userContact,
                  it_contact: form.value.itContact,
                  mvp_date: form.value.mvpDate ? form.value.mvpDate.toLocaleDateString() : '',
                  involve_pms: form.controls.involvePms.value,
                  involve_pms_start: form.value.involvePmsStart ? form.value.involvePmsStart.toLocaleDateString() : '',
                  involve_pms_end: form.value.involvePmsEnd ? form.value.involvePmsEnd.toLocaleDateString() : '',
                  status: form.value.projectStatus,
                  close: form.controls.closeProject.value,
                  version_control: form.value.versionControl,
                  users: form.value.users,
                  approve_date:form.value.approve_date??null,
                  close_date:form.value.close_date??null,
                  jira_project_id:form.value.jira_project_id??null,
                  create_date:data?.create_date,
                  create_user:data?.create_user,
                };
                console.log('projectValue',projectValue);
                let result;
                if(data){
                  result = await this.projectService.updateProject(
                    formValue.id,
                    projectValue
                  );
                }else{
                  result = await this.projectService.createProject(
                    projectValue
                  );
                }
                
                // 添加成功
                this.message.success('success');
                modal.destroy();
                this.getProjectList();
                if (!result.close) {
                  this.submitToApprove(result);
                }
              } else {
                console.log('未通过', form?.value);
                return;
              }
              console.log(
                'ok',
                componentInstance?.projectForm,
                formValue,
                users,
                version_control
              );
            } catch (error) {
              console.log(error);
              this.message.error('common.tooltip.addError');
            } finally {
              this.isLoading = false;
            }
          },
        },
      ],
    });
  }

  addProject() {
    this.openProjectModal();
  }

  doUploadFile(inputEle: HTMLInputElement) {
    inputEle.click();
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

    const [projects, versions, members] = data;

    // 取得PO與TL資料
    data[0] = await Promise.all(
      data[0].map(async (element: any) => {
        //取得PO的資料
        const poName = element['用戶 PM/PO'].toString().toUpperCase();
        var poList = await this.getJiraUserByCondition([poName]);
        if (poList && poList.length > 0) {
          element['po_data'] = [
            {
              id: 0,
              user_id: poList[0].id,
              project_id: 0,
              user_name: poList[0].user_name,
              employee_id: poList[0].employee_id,
              email: poList[0].email,
            },
          ];
        }

        //取得TL的資料
        const tlName = element['IT PM/Tech Leader'].toString().toUpperCase();
        var tlList = await this.getJiraUserByCondition([tlName]);
        if (tlList && tlList.length > 0) {
          element['tl_data'] = [
            {
              id: 0,
              user_id: tlList[0].id,
              project_id: 0,
              user_name: tlList[0].user_name,
              employee_id: tlList[0].employee_id,
              email: tlList[0].email,
            },
          ];
        }
        console.log(element);
        return element;
      })
    );

    // 取得是否已經存在JIRA KEY
    const jiraKeyList = data[0].map((j: any) => {
      return j['Jira Key'].toString().toUpperCase();
    });
    const systemProjectList = await this.projectService.getProject(
      undefined,
      undefined,
      undefined,
      jiraKeyList
    );

    // 取得專案成員所有的名稱
    const memberNames = data[2].map((m: any) => {
      return m['用戶名稱'].toString().toUpperCase();
    });
    const memberNameList = await this.getJiraUserByCondition(memberNames);
    const memberEmployeeIds = data[2].map((m: any) => {
      return m['工號'].toString().toUpperCase();
    });
    const memberEmployeeIdList = await this.getJiraUserByCondition(
      memberEmployeeIds
    );
    const jiraUserList = memberNameList.concat(memberEmployeeIdList);
    console.log(jiraUserList);

    const builder = new UploadedProjectBuilder();
    const validators = [
      new PmsInvolveDateValidator(),
      new JiraUserExistValidator(jiraUserList),
      new DuplicatedJiraKeyValidator(systemProjectList),
      new POTLExistValidator(),
    ];

    try {
      const uploadedData = new ProjectReportValidatedProxy(builder, validators)
        .addProject(projects.map((p:any) => new UploadedProjectAdapter(p)))
        .addVersion(versions.map((v:any) => new UploadedVersionAdapter(v)))
        .addMember(members.map((m:any) => new UploadedMemberAdapter(m)))
        .build();
      await this.projectService
        .upsertProject(uploadedData)
        .then(() => this.getProjectList());

      this.message.success('上傳成功');
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      if (
        error instanceof Error &&
        error.message === 'Involve PMS but missing PMS involve date'
      ) {
        this.message.error('上傳資料有誤，導入PMS未設定導入起訖時間');
      } else if (
        error instanceof Error &&
        error.message.match(/^User(.*)not exist in jira$/g)
      ) {
        this.message.error(
          `使用者 ${error.message
            .replace('User ', '')
            .replace(' not exit in jira', '')} 未註冊至 PMS`
        );
      } else if (
        error instanceof Error &&
        error.message.match(/^Jira Key(.*)have been existed$/g)
      ) {
        this.message.error(
          `出現重複的 Jira Key: ${error.message
            .replace('Jira Key ', '')
            .replace(' have been existed', '')}`
        );
      } else {
        this.message.error(`上傳失敗: ${error}`);
        console.error(error);
      }
    }
  }

  // 点击查询
  async getProjectList() {
    this.isLoading = true;
    console.log('getProjectList',this.projectName,this.div,this.isClosedProject);
    // const result: any = await this.http.get('../../../assets/constant/pms/mock3.json').toPromise();
    const result = await this.projectService.getProject(
      this.projectName,
      this.div ? [this.div??''] : undefined,
      this.isClosedProject === 'all'
        ? undefined
        : this.isClosedProject === 'true'
        ? true
        : false
    );
    if (result.length == 0) {
      // 沒有查詢到
      this.message.error('common.messages.notFound');
      this.projectDataSource = [];
      this.projectDataSource = this.projectDataSource.slice(0);
      this.isLoading = false;
      return;
    }
    this.allProject = result;
    this.projectDataSource = [];
    this.projectDataSource = result;
    console.log('projectDataSource', this.projectDataSource);
    this.projectDataSource = this.projectDataSource.slice(0);
    this.formatData();
    this.selectIndex = 1;
    this.isLoading = false;
  }

  formatData() {
    this.projectDataSource.forEach((element) => {
      const productionType: [] = JSON.parse(element.product_type);
      productionType.forEach((type) => {
        console.log(type);
        this.translate
          .get(`PMS.ProductType.${type}`)
          .subscribe((res: string) => {
            element.product_typeDescription = `${
              !element.product_typeDescription
                ? ''
                : `${element.product_typeDescription}\t\n`
            }${res}`;
          });
      });
      element.user_contact_name = element.user_contact[0].user_name;
      element.it_contact_name = element.it_contact[0].user_name;
      element.active_users = element.users ? element.users.length : 0;
    });
  }

  createComponentModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Modal Title',
      // nzContent: NzModalCustomComponent,
      // nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        title: 'title in component',
        subtitle: 'component sub title，will be changed after 2 sec',
      },
      nzOnOk: () => new Promise((resolve) => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'change component title from outside',
          onClick: (componentInstance) => {
            componentInstance!.title = 'title in inner component is changed';
          },
        },
      ],
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe((result) =>
      console.log('[afterClose] The result is:', result)
    );

    // delay until modal instance created
    setTimeout(() => {
      instance.subtitle = 'sub title is changed';
    }, 2000);
  }

  async getJiraUserByCondition(condition: string[]): Promise<JiraUser[]> {
    var userList: JiraUser[] = [];
    if (!userList || userList.length <= 0) {
      userList = await this.jiraUserService.getJiraUser({
        userName: undefined,
        status: undefined,
        jiraGroup: undefined,
        userNames: condition,
      });
    }
    if (!userList || userList.length <= 0) {
      userList = await this.jiraUserService.getJiraUser({
        userName: undefined,
        status: undefined,
        jiraGroup: undefined,
        userNames: undefined,
        email: undefined,
        emails: condition,
      });
    }
    if (!userList || userList.length <= 0) {
      userList = await this.jiraUserService.getJiraUser({
        userName: undefined,
        status: undefined,
        jiraGroup: undefined,
        userNames: undefined,
        email: undefined,
        emails: undefined,
        employeeId: undefined,
        employeeIds: condition,
      });
    }
    return userList;
  }

  // 用来处理 jirauser 和project 状态改变
  processAction = (
    componentInstance:
      | AddJiraProjectModalComponent
      | AddJiraUserModalComponent
      | undefined,
    success: 0 | 1 | 2 /**2 是更新project status使用的 */,
    id: number,
    modal: NzModalRef
  ) => {
    if (componentInstance) {
      this.projectService
        .updateProjectJiraSatus(
          id,
          success,
          componentInstance?.projectForm.value.jiraKey,
          componentInstance?.projectForm.value.remark
        )
        .then((response) => {
          if (response.length != 0) {
            // 修改成功
            this.getProjectList();
            this.message.success('success');
          } else {
            this.message.error('update project jira create status error');
          }
        })
        .finally(() => {
          this.getProjectList();
          this.message.error('update project jira create status error');
          modal.destroy();
        });
    }
  };

  exportExcel(): void {
    const peojects = this.projectDataSource.map(
      (p) => new ProjectReportAdapter(p)
    );
    const header = PROJECT_REPORT_HEADER;
    this.excel.export(peojects, header, 'Projects', '專案列管清單');
  }
}
