import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tss-report',
  templateUrl: './tss-report.component.html',
  styleUrls: ['./tss-report.component.scss']
})
export class TssReportComponent implements OnInit {

  constructor(
    public title: Title,
    public translate: TranslateService,
  ) {
    this.title.setTitle(this.translate.instant('home.tssReport') + ' - ' + this.translate.instant('title'));
  }

  ngOnInit(): void {
  }

}
