import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Division } from '@commonDefine/pms/division';
import { JiraUser } from '@commonDefine/pms/jira-user';
import { Project } from '@commonDefine/pms/project';
import { ProjectUser } from '@commonDefine/pms/project-user';
import { ProjectRepo } from '@commonDefine/pms/projectRepo';
import { SelectOption } from '@commonDefine/pms/select-option';
import { DivisionService } from '@commonService/pms/division.service';
import { JiraUserService } from '@commonService/pms/jira-user.service';
import { ProjectService } from '@commonService/pms/project.service';
import { ImpTranslateService } from '@commonService/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { PROJECT_REPO_HEADER } from '@pages/pms-todo/constant/PROJECT_REPO_HEADER';
import { PROJECT_USER_HEADER } from '@pages/pms-todo/constant/PROJECT_USER_HEADER';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalService } from 'ng-zorro-antd/modal';
import { from, Observable, Observer } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { AddProjectRepoComponent } from '../add-project-repo/add-project-repo.component';
import { AddProjectUserComponent } from '../add-project-user/add-project-user.component';
import { JIRA_ROLE_OPTION } from '../constant/JIRA_ROLE_OPTION';
import { PROJECT_ROLE_OPTION } from '../constant/PROJECT_ROLE_OPTION';
import { TableHeaderInfo } from './../../../define/common.define';
export type MyValidationErrors = Record<string, MyErrorsOptions>;
export type MyErrorsOptions = { 'zh-cn': string; en: string } & Record<
  string,
  NzSafeAny
>;
@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss'],
})
export class AddProjectModalComponent implements OnInit {
  @Input()
  data!: Project;
  projectForm!: FormGroup;
  DEVISION_LIST: SelectOption[] = [];
  PROJECT_MODE_LIST: SelectOption[] = [
    {
      optionLabel: 'PMS.ProjectMode.agile',
      optionValue: 'agile',
      disabled: false,
    },
    {
      optionLabel: 'PMS.ProjectMode.waterfall',
      optionValue: 'waterfall',
      disabled: false,
    },
    {
      optionLabel: 'PMS.ProjectMode.kanban',
      optionValue: 'kanban',
      disabled: false,
    },
  ];
  contactUserSearchForm!: FormGroup;
  contactUserSearchList$!: Observable<JiraUser[]>;
  selectUserContact: ProjectUser[] = [];

  itSearchForm!: FormGroup;
  itSearchList$: Observable<any[]> | undefined;
  selectITContact: ProjectUser[] = [];
  projectRepoTableSource: ProjectRepo[] = [];
  PROJECT_REPO_HEADER: TableHeaderInfo[] = [];
  get getProjectRepoTableSource() {
    return this.projectRepoTableSource.filter((item) => {
      if (!item.action) {
        item.action = '';
      }
      return item.action !== 'DELETED';
    });
  }
  projectUserTableSource: ProjectUser[] = [];
  PROJECT_USER_HEADER: TableHeaderInfo[] = [];
  get getProjectUserTableSource() {
    return this.projectUserTableSource.filter((item) => {
      if (!item.action) {
        item.action = '';
      }
      return item.action !== 'DELETED';
    });
  }
  jiraKeyValidateMsg?: string = undefined;
  showJiraKeyValidateProgress: boolean = false;

  isSearchUserInfo = false;
  isSearchITInfo = false;
  constructor(
    private fb: FormBuilder,
    private divisionService: DivisionService,
    private message: ImpTranslateService,
    private jiraUserService: JiraUserService,
    public translate: TranslateService,
    private modal: NzModalService,
    private projectService: ProjectService
  ) {}

  compareFun = (o1: any | string, o2: any): boolean => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };

  ngOnInit() {
    this.iniForm();
    this.initTable();
    this.getDivList();
    this.subjectUserNameChange();
  }

  initTable() {
    this.projectRepoTableSource = [...(this.data?.version_control ?? [])];
    this.projectUserTableSource = [...(this.data?.users ?? [])];
    this.projectUserTableSource.forEach((user) => {
      this.translateValueToLabel(user);
    });

    this.PROJECT_REPO_HEADER = this.data
      ? [
          ...PROJECT_REPO_HEADER,
          {
            content: 'common.OPERATION',
            left: false,
            right: false,
            align: 'center',
            width: 50,
            key: 'operation',
          } as TableHeaderInfo,
        ]
      : PROJECT_REPO_HEADER;

    this.PROJECT_USER_HEADER = this.data
      ? [
          ...PROJECT_USER_HEADER,
          {
            content: 'common.OPERATION',
            left: false,
            right: false,
            align: 'center',
            width: 50,
            key: 'operation',
          } as TableHeaderInfo,
        ]
      : PROJECT_USER_HEADER;
  }

  jiraKeyAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      const input = control.value;
      if (!this.projectForm?.controls?.jiraKey.hasError('pattern')) {
        this.projectService
          .validJiraKey(input)
          .then((result) => {
            if (result.success === true) {
              observer.next(null);
            } else {
              observer.next({ error: true, duplicated: true });
            }
          })
          .catch((error) => {
            observer.next({ error: true, duplicated: true });
          })
          .finally(() => {
            observer.complete();
          });
      }
    });

  iniForm() {
    const data = this.data;
    this.projectForm = this.fb.group({
      id: new FormControl(data?.id ?? 0),
      projectName: [
        data?.project_name ?? '',
        [Validators.required, Validators.maxLength(50)],
      ],
      projectCode: new FormControl(data?.project_code ?? '', [
        Validators.required,
        Validators.maxLength(12),
      ]),
      division: new FormControl(data?.division ?? null, [Validators.required]),
      divisionSupervisor: new FormControl(data?.division_supervisor ?? null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      divisionSupervisorEmail: new FormControl(
        data?.division_supervisor_email ?? '',
        [Validators.required, Validators.email]
      ),
      projectMode: new FormControl(data?.mode ?? 'agile', [
        Validators.required,
      ]),
      productTypeProduct: new FormControl(
        JSON.parse(data?.product_type ?? '[]')[0] ?? false,
        [Validators.required]
      ),
      productTypeModel: new FormControl(
        JSON.parse(data?.product_type ?? '[]')[1] ?? false,
        [Validators.required]
      ),
      planStart: new FormControl(
        data?.plan_start ? new Date(data?.plan_start) : '',
        [Validators.required]
      ),
      planEnd: new FormControl(data?.plan_end ? new Date(data?.plan_end) : '', [
        Validators.required,
      ]),
      jiraKey: [
        data?.jira_key ?? '',
        [Validators.required, Validators.maxLength(10)],
        [this.jiraKeyAsyncValidator],
      ],
      jiraName: new FormControl(data?.jira_name ?? '', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      userContact: new FormControl(data?.user_contact ?? ''),
      userContactUserName: new FormControl(
        { value: data?.user_contact[0].user_name ?? '', disabled: true },
        [Validators.required, Validators.maxLength(50)]
      ),
      userContactEmail: new FormControl(
        { value: data?.user_contact[0].email ?? '', disabled: true },
        [Validators.required, Validators.email]
      ),
      itContact: new FormControl(data?.it_contact ?? ''),
      itContactUserName: new FormControl(
        { value: data?.it_contact[0].user_name ?? '', disabled: true },
        [Validators.required, Validators.maxLength(50)]
      ),
      itContactEmail: new FormControl(
        { value: data?.it_contact[0].email ?? '', disabled: true },
        [Validators.required, Validators.email]
      ),
      mvpDate: new FormControl(
        data?.mvp_date ? new Date(data?.mvp_date) : '',
        []
      ),
      involvePms: new FormControl(data?.involve_pms ?? true, [
        Validators.required,
      ]),
      involvePmsStart: new FormControl(
        data?.involve_pms_start ? new Date(data?.involve_pms_start) : '',
        []
      ),
      involvePmsEnd: new FormControl(
        data?.involve_pms_end ? new Date(data?.involve_pms_end) : '',
        []
      ),
      closeProject: new FormControl(
        {
          value: data?.close ?? false,
          disabled: data?.status === undefined ? true : false,
        },
        []
      ),
      projectStatus: new FormControl(data?.status ?? 0),
      userName: new FormControl(''),
      itUserName: new FormControl(''),
      users: new FormControl([]),
      versionControl: new FormControl([]),
      approve_date: new FormControl(
        data?.approve_date ? new Date(data?.approve_date) : null
      ),
      close_date: new FormControl(
        data?.close_date ? new Date(data?.close_date) : null
      ),
      jira_project_id: new FormControl(data?.jira_project_id ?? null),
    });

    this.itSearchForm = this.fb.group({
      userName: new FormControl(''),
    });
    this.itSearchForm.controls.userName.valueChanges
      .pipe(debounceTime(750))
      .subscribe((input: any) => {
        if (input) {
          this.itSearchList$ = from(
            this._filter(input).then((users) => {
              return users.filter(
                (user) =>
                  user.user_name
                    .toLocaleUpperCase()
                    .indexOf(input.toLocaleUpperCase()) >= 0 ||
                  user.employee_id
                    ?.toLocaleUpperCase()
                    .indexOf(input.toLocaleUpperCase()) >= 0
              );
            })
          );
        } else {
          this.itSearchList$ = new Observable<any[]>();
        }
      });
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

  private async _filter(value: string): Promise<JiraUser[]> {
    var userList: JiraUser[] = [];
    await this.jiraUserService
      .getJiraUser({ userName: value, status: 1 })
      .then((users) => {
        userList = userList.concat(users);
      });
    await this.jiraUserService
      .getJiraUser({ status: 1, employeeId: value })
      .then((users) => {
        userList = userList.concat(users);
      });
    const result = userList.filter(
      (user) =>
        user.user_name.toLocaleUpperCase().indexOf(value.toLocaleUpperCase()) >=
          0 ||
        user.employee_id
          ?.toLocaleUpperCase()
          .indexOf(value.toLocaleUpperCase()) >= 0
    );
    this.isSearchITInfo = false;
    this.isSearchUserInfo = false;
    return result;
  }

  involvePmsChange() {
    const involvePms = this.projectForm.controls.involvePms.value;
    if (involvePms) {
      this.projectForm
        .get('involvePmsStart')
        ?.setValidators(Validators.required);
      this.projectForm.get('involvePmsEnd')?.setValidators(Validators.required);
      this.projectForm.get('involvePmsStart')?.patchValue('');
      this.projectForm.get('involvePmsEnd')?.patchValue('');
      this.projectForm.get('involvePmsStart')?.enable({ onlySelf: true });
      this.projectForm.get('involvePmsEnd')?.enable({ onlySelf: true });
    } else {
      this.projectForm.get('involvePmsStart')?.clearValidators();
      this.projectForm.get('involvePmsStart')?.patchValue('');
      this.projectForm.get('involvePmsStart')?.disable({ onlySelf: true });
      this.projectForm.get('involvePmsEnd')?.clearValidators();
      this.projectForm.get('involvePmsEnd')?.patchValue('');
      this.projectForm.get('involvePmsEnd')?.disable({ onlySelf: true });
    }
  }

  addITUser(selectUser: JiraUser) {
    this.selectITContact = [
      {
        id: 0,
        user_id: selectUser.id,
        project_id: 0,
        user_name: selectUser.user_name,
        employee_id: selectUser.employee_id,
        email: selectUser.email,
      },
    ];
    this.projectForm.patchValue({ itContact: this.selectITContact });
    this.projectForm.patchValue({
      itContactUserName: this.selectITContact
        ? this.selectITContact[0].user_name
        : '',
    });
    this.projectForm.patchValue({
      itContactEmail: this.selectITContact ? this.selectITContact[0].email : '',
    });
    this.projectForm.patchValue({ itUserName: null });
    console.log('formvalue', this.projectForm.value);
  }

  addContactUser(selectUser: JiraUser) {
    console.log(selectUser);
    this.selectUserContact = [
      {
        id: 0,
        user_id: selectUser.id,
        project_id: 0,
        user_name: selectUser.user_name,
        employee_id: selectUser.employee_id,
        email: selectUser.email,
      },
    ];
    this.projectForm.patchValue({
      userContact: this.selectUserContact,
    });
    this.projectForm.patchValue({
      userContactUserName: this.selectUserContact
        ? this.selectUserContact[0].user_name
        : '',
    });
    this.projectForm.patchValue({
      userContactEmail: this.selectUserContact
        ? this.selectUserContact[0].email
        : '',
    });
    this.projectForm.patchValue({ userName: null });
    this.isSearchITInfo = false;
    this.isSearchUserInfo = false;
  }

  subjectUserNameChange() {
    this.projectForm.controls.userName.valueChanges
      .pipe(
        debounceTime(750),
        filter((input: string) => input !== null && input.trim() !== ''),
        map((input: string) => {
          this.isSearchUserInfo = true;
          return from(this._filter(input));
        })
      )
      .subscribe((value) => {
        this.contactUserSearchList$ = value;
      });

    this.projectForm.controls.itUserName.valueChanges
      .pipe(
        debounceTime(750),
        filter((input: string) => input !== null && input.trim() !== ''),
        map((input: string) => {
          this.isSearchITInfo = true;
          return from(this._filter(input));
        })
      )
      .subscribe((value) => {
        this.itSearchList$ = value;
      });
  }

  deleteItem(
    data: ProjectRepo | ProjectUser,
    tableName: 'projectRepoTableSource' | 'projectUserTableSource'
  ) {
    console.log('deleteItem', data, tableName);
    const index: number = this[tableName].findIndex(
      (value: ProjectRepo | ProjectUser) => value.id === data.id
    );
    Reflect.set(this[tableName][index], 'action', 'DELETED');
    if(tableName === 'projectRepoTableSource'){
      this.projectForm.patchValue({
        versionControl: this[tableName],
      });
    }else if(tableName === 'projectUserTableSource'){
      this.projectForm.patchValue({
        users: this[tableName],
      });
    }
    
  }

  openProjectRepoModal(data?: ProjectRepo): void {
    const modal = this.modal.create({
      nzCentered: true,
      nzWidth: '30%',
      nzTitle: data
        ? this.translate.instant('PMS.EditProjectRepo')
        : this.translate.instant('PMS.AddProjectRepo'),
      nzContent: AddProjectRepoComponent,
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
          label: this.translate.instant('common.CONFIRM'),
          type: 'primary',
          onClick: (componentInstance) => {
            const repo = componentInstance?.repoForm.value;
            const index: number = this.projectRepoTableSource.findIndex(
              (value) => {
                return value.id === data?.id;
              }
            );
            const repoObj = {
              action: '',
              id: repo.id,
              version_control: repo.versionControl,
              repo_id: repo.repoId,
              project_id: repo.projectId,
              repo_url: repo.repoUrl,
              type: repo.type,
              ut_job_name: repo.utJobName,
            };
            if (data) {
              Reflect.set(repoObj, 'action', 'UPDATE');
              this.projectRepoTableSource[index] = repoObj;
              this.projectRepoTableSource = [...this.projectRepoTableSource];
            } else {
              Reflect.set(repoObj, 'action', 'ADD');
              this.projectRepoTableSource = [
                ...this.projectRepoTableSource,
                repoObj,
              ];
            }
            this.projectForm.patchValue({
              versionControl: [...this.projectRepoTableSource],
            });
            modal.destroy();
          },
        },
      ],
    });
  }

  openProjectUserModal(data?: ProjectUser): void {
    const modal = this.modal.create({
      nzCentered: true,
      nzWidth: '35%',
      nzTitle: data
        ? this.translate.instant('PMS.EditProjectUser')
        : this.translate.instant('PMS.AddProjectUser'),
      nzContent: AddProjectUserComponent,
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
          label: this.translate.instant('common.CONFIRM'),
          type: 'primary',
          onClick: (componentInstance) => {
            const controls = componentInstance?.userForm.controls;
            const user = {
              action: data ? 'UPDATE' : 'ADD',
              email: controls?.email.value,
              employee_id: controls?.employeeId.value,
              id: controls?.id.value,
              jira_role: controls?.jiraRole.value,
              project_id: controls?.projectId.value,
              project_role: controls?.projectRole.value,
              user_id: controls?.userId.value,
              user_name: controls?.userName.value,
            };

            PROJECT_ROLE_OPTION.forEach((option) => {
              if (user.project_role === option.optionValue) {
                Reflect.set(
                  user,
                  'project_roleDescription',
                  this.translate.instant(option.optionLabel)
                );
              }
            });
            JIRA_ROLE_OPTION.forEach((option) => {
              if (user.jira_role === option.optionValue) {
                Reflect.set(
                  user,
                  'jira_roleDescription',
                  this.translate.instant(option.optionLabel)
                );
              }
            });
            if (data) {
              const index = this.projectUserTableSource.findIndex(_user=>_user.id === user.id);
              this.projectUserTableSource[index] = user;
              this.projectUserTableSource = [...this.projectUserTableSource];
            } else {
              this.projectUserTableSource = [
                ...this.projectUserTableSource,
                user,
              ];
            }
            
            this.projectForm.patchValue({
              users: [...(this.projectUserTableSource ?? [])],
            });
            modal.destroy();
          },
        },
      ],
    });
  }

  translateValueToLabel(user: any) {
    PROJECT_ROLE_OPTION.forEach((option) => {
      if (
        user.projectRole === option.optionValue ||
        user.project_role === option.optionValue
      ) {
        user.project_roleDescription = this.translate.instant(
          option.optionLabel
        );
      }
    });
    JIRA_ROLE_OPTION.forEach((option) => {
      if (
        user.jiraRole === option.optionValue ||
        user.jira_role === option.optionValue
      ) {
        user.jira_roleDescription = this.translate.instant(option.optionLabel);
      }
    });
  }
}
