import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JiraUser } from '@commonDefine/pms/jira-user';
import { ProjectUser } from '@commonDefine/pms/project-user';
import { SelectOption } from '@commonDefine/pms/select-option';
import { JiraUserService } from '@commonService/pms/jira-user.service';
import { from, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { JIRA_ROLE_OPTION } from '../constant/JIRA_ROLE_OPTION';
import { PROJECT_ROLE_OPTION } from '../constant/PROJECT_ROLE_OPTION';

@Component({
  selector: 'app-add-project-user',
  templateUrl: './add-project-user.component.html',
  styleUrls: ['./add-project-user.component.scss']
})
export class AddProjectUserComponent implements OnInit {
  @Input()
  data!:ProjectUser;
  projectRoleOptions:SelectOption[] = PROJECT_ROLE_OPTION;

  jiraRoleOptions:SelectOption[] = JIRA_ROLE_OPTION;
  userForm!: FormGroup;
  userSearchForm: any;
  selectMember: any;
  userSearchList$: Observable<any[]> | undefined;

  isSearchUserInfo = false;
  constructor(
    private formBuilder: FormBuilder,
    private jiraUserService: JiraUserService,
  ) { }

  ngOnInit() {
    this.iniForm();
    this.subjectControlChange();
  }

  iniForm() {
    const data = this.data;
    console.log('project_user',data);
    this.userForm = this.formBuilder.group({
      id: new FormControl(data?.id??0, [Validators.required]),
      projectId: new FormControl(data?.project_id ??0, [Validators.required]),
      userId: new FormControl({value:data?.user_id??undefined,disabled:true}, [Validators.required]),
      userName: new FormControl({value:data?.user_name??'',disabled:true}, [Validators.required]),
      userNameSearchWord: new FormControl(''),
      employeeId: new FormControl({value:data?.employee_id??'',disabled:true}, []),
      email: new FormControl({value:data?.email??'',disabled:true}, [Validators.required, Validators.email]),
      projectRole: new FormControl(data?.project_role??'', [Validators.required]),
      jiraRole: new FormControl(data?.jira_role??'', [Validators.required]),
    });

  }

  private async _filter(value: string): Promise<JiraUser[]> {
    var userList: JiraUser[] = [];
    this.isSearchUserInfo = true
    await this.jiraUserService.getJiraUser({userName:value,status:1}).then((users) => {
      userList = userList.concat(users);
    });
    await this.jiraUserService.getJiraUser({status:1,employeeId:value}).then((users) => {
      userList = userList.concat(users);
    });
    this.isSearchUserInfo = false;
    return userList;
  }

  addUser(selectUser: JiraUser) {
    console.log(selectUser);
    this.userForm.controls.userId.setValue(selectUser.id);
    this.userForm.controls.userName.setValue(selectUser.user_name);
    this.userForm.controls.employeeId.setValue(selectUser.employee_id);
    this.userForm.controls.email.setValue(selectUser.email);
    this.userForm.controls.userNameSearchWord.setValue('');
    // this.userSearchForm.controls.userName.setValue({value:null,disabled:true});

    this.selectMember = {
      id: this.userForm.controls.id.value,
      project_id: this.userForm.controls.projectId.value,
      user_id: selectUser.id,
      user_name: selectUser.user_name,
      employee_id: selectUser.employee_id,
      email: selectUser.email,
    }
  }

  subjectControlChange(){
    this.userForm.get('userNameSearchWord')?.valueChanges.pipe(debounceTime(750))
    .subscribe((input: any) => {
      if (input) {
        this.userSearchList$ = from(
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
        this.userSearchList$ = new Observable<any[]>();
      }
    });
  }
}
