import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
export interface Guide {
  guide: string;
  guideDescription: string;
  picture: string;
  // guide: 'Step 1';
  // guideDescription: 'PMS.Guide.RepoId';
  // picture: 'assets/pms-guide-image/RepoId-1.png';
}
@Component({
  selector: 'app-tip-modal',
  templateUrl: './tip-modal.component.html',
  styleUrls: ['./tip-modal.component.scss'],
})
export class TipModalComponent implements OnInit {
  @Input()
  nzTooltipTitle = '';
  @Input()
  title = 'PMS.RepoID';
  @Input()
  guides: Guide[] = [
    {
      guide: 'Step 1',
      guideDescription: 'PMS.Guide.RepoId',
      picture: 'assets/pms-guide-image/RepoId-1.png',
    },
  ];
  constructor(
    private modal: NzModalService,
    private translate: TranslateService
  ) {}

  ngOnInit() {}

  handleClick(modalContent: TemplateRef<any>) {
    this.modal.create({
      nzWidth: '70%',
      nzBodyStyle:{'height':'70vh','overflow-y':'scroll'},
      nzContent: modalContent,
      nzTitle: this.translate.instant(this.title),
      nzFooter: [],
      nzMaskClosable: true,
      nzClosable: true,
      nzComponentParams: {},
    });
  }
}
