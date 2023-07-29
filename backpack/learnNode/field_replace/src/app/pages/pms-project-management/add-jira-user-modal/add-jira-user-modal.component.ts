import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-jira-user-modal',
  templateUrl: './add-jira-user-modal.component.html',
  styleUrls: ['./add-jira-user-modal.component.scss']
})
export class AddJiraUserModalComponent implements OnInit {
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
      projectName: new FormControl({ value: data?.project_name ?? '', disabled: data??false }, [Validators.required, Validators.maxLength(50)]),
      jiraKey: new FormControl({ value: data?.jira_key?? '', disabled: false }, [Validators.required, Validators.maxLength(10)]),
      remark: new FormControl('', []),
    });
  }
}
