import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tab } from '@commonDefine/common.define';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-ipm-tab',
    templateUrl: './ipm-tab.component.html',
    styleUrls: ['./ipm-tab.component.scss']
})
export class IpmTabComponent implements OnInit {

    @Input() tabType: string = 'underLine';

    @Input() tab: string | undefined;
    @Input() tabList: Tab[] = [];

    @Output() tabChange = new EventEmitter();

    constructor(
        public translate: TranslateService,
    ) { }

    ngOnInit(): void {
    }

    doTabChange(item: Tab) {
        if (!item.disabled) {
            this.tab = item.tab;
            this.tabChange.emit(item.tab)
        }
    }

}
