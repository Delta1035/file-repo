import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-report-checking',
  templateUrl: './report-checking.component.html',
  styleUrls: ['./report-checking.component.scss']
})
export class ReportCheckingComponent implements OnInit {

  constructor(
    public title: Title,
    public translate: TranslateService,
  ) {
    this.title.setTitle(this.translate.instant('home.reportChecking') + ' - ' + this.translate.instant('title'));
  }

  ngOnInit(): void {
  }

}
