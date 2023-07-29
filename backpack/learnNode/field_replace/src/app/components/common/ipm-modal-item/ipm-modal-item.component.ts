import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '@commonUtils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { differenceInCalendarDays } from 'date-fns';

@Component({
    selector: 'app-ipm-modal-item',
    templateUrl: './ipm-modal-item.component.html',
    styleUrls: ['./ipm-modal-item.component.scss']
})
export class IpmModalItemComponent implements OnInit {

    @Input() itemData: any;

    @Output() onChange = new EventEmitter();

    must: boolean = false;

    type: 'calendar' | 'input' | 'select' | 'text' = 'text';
    itemType: string = '';

    range: any[] = [];
    list: any[] = [];

    disabled: boolean = false;

    status: 'warning' | 'error' | 'success' | '' = '';

    tipInfo: string = '';

    validators = {
        email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    }

    placeholder: string = '';

    // 默認小數位數
    precision: number = 2;

    constructor(
        public fb: FormBuilder,
        public translate: TranslateService,
        public utils: UtilsService,
    ) { }

    ngOnInit(): void {
        this.must = this.itemData.must;
        // this.status = this.itemData.status;
        this.itemType = this.itemData.type;
        this.disabled = this.itemData.disabled ? this.itemData.disabled : false;
        this.range = this.itemData.range ? this.itemData.range : [];
        this.list = this.itemData.list;
        let prePlaceholder = '';
        switch (this.itemType) {
            case 'email':
            case 'number':
            case 'input':
                prePlaceholder = this.translate.instant('notice.pleaseInput');
                this.type = 'input';
                break;
            case 'text':
                this.type = 'text';
                break;
            case 'select':
                prePlaceholder = this.translate.instant('notice.pleaseSelect');
                this.type = 'select';
                break;
            case 'date':
            case 'month':
            case 'year':
                prePlaceholder = this.translate.instant('notice.pleaseSelect');
                this.type = 'calendar';
                break;
            default:
                prePlaceholder = this.translate.instant('notice.pleaseInput');
                this.type = 'input';
                break;
        }
        if (this.itemType === 'email') {
            this.placeholder = 'example@wistron.com'
        } else {
            this.placeholder = prePlaceholder + (this.itemData.title ? this.translate.instant(this.itemData.title) : '')
        }
        this.valueChange(this.itemData.value, false);
    }

    valueChange(event: any, flag = true) {
        // falg 為 false 表示加載時檢查，true才是真正輸入的時候的檢查
        let sratusResult: 'warning' | 'error' | 'success' | '' = '';
        if (this.itemType === 'email') {
            sratusResult = event ? (this.validators.email.test(event) ? 'success' : 'warning') : (this.must ? 'error' : '')
        } else if (this.itemType === 'number') {
            // console.log(event);
            // this.itemData.value = Number(String(event).replace(
            //     /^(-)*(\d+)\.(\d).*$/,
            //     "$1$2.$3"
            // ));
            sratusResult = (String(event) && event !== null) ? (!isNaN(Number(event)) && Number(event) <= this.range[1] && Number(event) >= this.range[0] ? 'success' : 'warning') : (this.must ? 'error' : '')
        } else if (this.itemType === 'input') {
            sratusResult = event ? 'success' : (this.must ? 'error' : '')
        } else if (this.itemType === 'select') {
            sratusResult = event !== '' ? 'success' : (this.must ? 'error' : '')
        } else if (
            this.itemType === 'date' ||
            this.itemType === 'month' ||
            this.itemType === 'year'
        ) {
            sratusResult = event ? 'success' : (this.must ? 'error' : '')
        }
        this.itemData.status = sratusResult === '' || sratusResult === 'success';
        if (flag) {
            this.status = sratusResult;
        }
        this.onChange.emit({
            flag
        });
    }

    disabledDate = (current: Date): boolean =>
        differenceInCalendarDays(current, this.range[1]) > 0 ||
        differenceInCalendarDays(current, this.range[0]) < 0
}
