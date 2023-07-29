import { Component, Input, OnInit } from '@angular/core';
import { Project } from '@commonDefine/pms/project';
import { ProjectRepo } from '@commonDefine/pms/projectRepo';
import { Sign, SignDetail } from '@commonDefine/pms/sign';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { PROJECT_PROCESS_RESULT_HEADER } from '../constant/PROJECT_PROCESS_RESULT_HEADER';
import { PROJECT_REPO_HEADER } from '../constant/PROJECT_REPO_HEADER';
import { PROJECT_UPDATE_HEADER } from '../constant/PROJECT_UPDATE_HEADER';
import { PROJECT_USER_HEADER } from '../constant/PROJECT_USER_HEADER';
import { ProjectUser } from './../../../define/pms/project-user';

@Component({
  selector: 'app-project-process-detail',
  templateUrl: './project-process-detail.component.html',
  styleUrls: ['./project-process-detail.component.scss']
})
export class ProjectProcessDetailComponent implements OnInit {
  @Input()
  selectSign!:Sign;
  @Input()
  signDetails:SignDetail[] = [];
  @Input()
  showApprove = false;
  approved = '';
  remark='';
  @Input()
  approveSubject!:Subject<any>;
  @Input()
  isTODO = false;
  PROJECT_REPO_HEADER=PROJECT_REPO_HEADER;
  versionControlTableSource:ProjectRepo[] = [];
  PROJECT_USER_HEADER=PROJECT_USER_HEADER;
  projectUsersTableSource:ProjectUser[] = [];
  PROJECT_UPDATE_HEADER=PROJECT_UPDATE_HEADER;
  PROJECT_PROCESS_RESULT_HEADER=PROJECT_PROCESS_RESULT_HEADER;
  get project():Project{
    return this.selectSign.project[0]
  }

  get updateUsers():ProjectUser[]{
    return this.selectSign.update_users??[];
  }
  constructor(private translate: TranslateService,
    ) { }

  ngOnInit() {
    this.versionControlTableSource = this.project.version_control?? [];
    this.projectUsersTableSource = this.project.users??[]
    console.log('selectSign',this.selectSign,this.versionControlTableSource);
    console.log('project',this.project);

  }

  approve(){
    this.approveSubject.next(JSON.stringify({
      remark:this.remark,
      approved:this.approved
    }))
  }

  formatData() {
    this.projectUsersTableSource.forEach((element) => {
      if (element.project_role) {
        this.translate
          .get(`PMS.projectRole.${element.project_role}`)
          .subscribe((res: string) => {
            element.project_roleDescription = res;
          });
      }
      // this.translate
      //   .get(`USERPROJECTSTATUS.${element.status}`)
      //   .subscribe((res: string) => {
      //     element.statusDescription = res;
      //   });
    });
  }
}
