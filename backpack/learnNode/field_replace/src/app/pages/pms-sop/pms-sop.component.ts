import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-pms-sop',
  templateUrl: './pms-sop.component.html',
  styleUrls: ['./pms-sop.component.scss']
})
export class PmsSOPComponent implements OnInit {
  selectIndex: number = 0;
  apid: string = '';
  mdSrc: string = 'assets/pms-sop/please-select-sop.md';
  mdLan: string = '';
  sopList: any = [];
  langList: any = [];
  mdList: any = [];
  constructor(
    public title: Title,
    public translate: TranslateService,
    private http: HttpClient,
  ) {
    this.title.setTitle(this.translate.instant('home.pmsSOP') + ' - ' + this.translate.instant('title'));
  }

  ngOnInit(): void {
    this.getSopListJSON();
  }

  getSopListJSON(){
    this.apid = 'PMS.PMSSOP';
    this.http.get('assets/pms-sop/sop-list.json').subscribe((res: any) => {
      // this.jsonDataResult = res;
      console.log(res);
      this.sopList = res;
      this.mdLan = res[0].language;
      this.onLanChange(this.mdLan);
    });
  }

  onLanChange(lan: string) {
    console.log(lan);
    this.sopList.forEach((element: any) => {
      if (element.language === lan) {
        this.mdList = element.sopList;
        this.mdSrc = this.mdList[0].sopPath;
      }
    });
  }

  selectTabChange(e: any) {
    this.selectIndex = e.index;
  }


}
