import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-to-approve-modal',
  templateUrl: './send-to-approve-modal.component.html',
  styleUrls: ['./send-to-approve-modal.component.scss']
})
export class SendToApproveModalComponent implements OnInit {
  projectForm!: FormGroup;
  @Input()
  data: any;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log('AddJiraProjectModalComponent',this.data);

    this.iniForm();
  }

  iniForm() {
    const data = this.data;
    this.projectForm = this.formBuilder.group({
      projectName: new FormControl({ value: data?.project_name??'', disabled: true }, [Validators.required, Validators.maxLength(50)]),
      jiraKey: new FormControl({ value: data?.jira_key?? '', disabled: true }, [Validators.required, Validators.maxLength(10)]),
      divisionSupervisor: new FormControl({ value:  data?.division_supervisor??'', disabled: true }, [Validators.required, Validators.maxLength(10)]),
      divisionSupervisorEmail: new FormControl({ value: data?.division_supervisor_email?? '', disabled: true }, [Validators.required, Validators.maxLength(10)]),
      remark: new FormControl('', []),
    });
  }
}
