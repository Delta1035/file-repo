import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guide } from '@commonComponent/pms/tip-modal/tip-modal.component';
import { ProjectRepo } from '@commonDefine/pms/projectRepo';
import { SelectOption } from '@commonDefine/pms/select-option';

@Component({
  selector: 'app-add-project-repo',
  templateUrl: './add-project-repo.component.html',
  styleUrls: ['./add-project-repo.component.scss']
})
export class AddProjectRepoComponent implements OnInit {
  @Input()
  data!:ProjectRepo;
  repoForm!:FormGroup;
  versionControlOption:SelectOption[] = [
    {
      optionLabel:'GitLab',
      optionValue:'GitLab',
      disabled:false
    }
  ]

  typeOption:SelectOption[] = [
    {
      optionLabel:'UI',
      optionValue:'UI',
      disabled:false
    },
    {
      optionLabel:'Backend',
      optionValue:'Backend',
      disabled:false
    },
  ]

  repoIdTitle = 'PMS.RepoID';
  repoIdGuides:Guide[] = [
    {
      guide: 'Step 1',
      guideDescription: 'PMS.Guide.RepoId',
      picture: 'assets/pms-guide-image/RepoId-1.png',
    },
  ]

  utGuidesTitle= 'PMS.UTJobName';
  utGuides:Guide[]= [
    {
      guide: 'Step 1',
      guideDescription: 'PMS.Guide.UTJobName',
      picture: 'assets/pms-guide-image/UTJobName-1.png',
    },
    {
      guide: 'Step 2',
      guideDescription: 'PMS.Guide.UTJobName-2',
      picture: 'assets/pms-guide-image/UTJobName-2.png',
    },
    {
      guide: 'Step 3',
      guideDescription: 'PMS.Guide.UTJobName-3',
      picture: 'assets/pms-guide-image/UTJobName-3.png',
    }
  ]
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.iniForm();
  }

  iniForm() {
    console.log('initForm',this.data);
    this.repoForm = this.formBuilder.group({
      id: new FormControl(this.data?.id??0, [Validators.required]),
      projectId: new FormControl(this.data?.project_id??0, [Validators.required]),
      versionControl: new FormControl(this.data?.version_control??'', [Validators.required, Validators.maxLength(10)]),
      type: new FormControl(this.data?.type??'', [Validators.required, Validators.maxLength(10)]),
      repoId: new FormControl( this.data?.repo_id??undefined, [Validators.required]),
      repoUrl: new FormControl((this.data?.repo_url)??'', [Validators.required]),
      utJobName: new FormControl(this.data?.ut_job_name??'', [Validators.maxLength(20)]),
    });
  }
}
