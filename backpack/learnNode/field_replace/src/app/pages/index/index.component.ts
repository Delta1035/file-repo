import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Tab } from '@commonDefine/common.define';
import { TranslateService } from '@ngx-translate/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    uploadFile: any;

    constructor(
        public title: Title,
        public translate: TranslateService,
    ) {
        this.title.setTitle(this.translate.instant('home.index') + ' - ' + this.translate.instant('title'));
    }

    ngOnInit(): void {
    }

}
