import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UtilsService } from '@commonUtils/utils.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pms-process',
  templateUrl: './pms-process.component.html',
  styleUrls: ['./pms-process.component.scss']
})
export class PmsProcessComponent implements OnInit {
  processUrl: string = 'assets/constant/pms/process.json';
  processList: any = [];
  processIconList: any = [];
  constructor(
    public title: Title,
    public translate: TranslateService,
    private utilServce:UtilsService
  ) {
    this.title.setTitle(this.translate.instant('home.pmsProcess') + ' - ' + this.translate.instant('title'));
  }

 async ngOnInit(): Promise<void> {
    const { processListContent, iconDescriptionContent } = await this.utilServce.readyJson(
      this.processUrl
    ) as any;
    this.processList = processListContent;
    this.processIconList = iconDescriptionContent;
  }

}
