import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-jira-project-modal',
  templateUrl: './add-jira-project-modal.component.html',
  styleUrls: ['./add-jira-project-modal.component.scss']
})
export class AddJiraProjectModalComponent implements OnInit {
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
      jiraKey: new FormControl({ value: data?.jira_key?? '', disabled: false }, [Validators.required, Validators.maxLength(10)]),
      remark: new FormControl('', []),
    });
  }
}
