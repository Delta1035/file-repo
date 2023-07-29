import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JiraUser } from '@commonDefine/pms/jira-user';
import { SelectOption } from '@commonDefine/pms/select-option';
import { ACCOUNT_STATUS } from '../constant/ACCOUNT_STATUS';
import { ORG_ROLE_LIST } from '../constant/ORG_ROLE_LIST';
@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss'],
})
export class UserEditModalComponent implements OnInit {
  @Input()
  isVisible = false;
  @Output()
  closeEvent = new EventEmitter();
  @Output()
  okEvent = new EventEmitter();

  isOkLoading = false;
  @Input()
  userInfo!: JiraUser;
  validateForm!: FormGroup;
  @Input()
  DEVISION_LIST:SelectOption[] = [];
  ORG_ROLE_LIST = ORG_ROLE_LIST;
  ACCOUNT_STATUS = ACCOUNT_STATUS;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      user_name: [this.userInfo.user_name, [Validators.required]],
      employee_id: [this.userInfo.employee_id, [Validators.required]],
      email: [this.userInfo.email],
      division: [this.userInfo.division],
      orgRole:[this.userInfo.org_role],
      status: [this.userInfo.status],
    });
    console.log('validateform', this.validateForm);
  }



  handleOk(): void {
    console.log(this.validateForm, this.validateForm.value);

    this.isOkLoading = true;
    const formValue = JSON.stringify(this.validateForm.value);
    this.okEvent.emit(formValue);
    // setTimeout(() => {
    //   this.close();
    //   this.isOkLoading = false;
    // }, 3000);
  }

  handleCancel(): void {
    this.close();
  }
  close() {
    this.closeEvent.emit();
  }
}
