import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Permission, Tab, TableHeaderInfo, TableInfo } from '@commonDefine/common.define';
import { BUWiwynnPAJ } from '@commonDefine/mep-bu-wiwynn-paj.define';
import { IpmApiService } from '@commonService/ipm-api.service';
import { PermissionsService } from '@commonService/permissions.service';
import { UtilsService } from '@commonUtils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-mep-bu-wiwynn-paj',
    templateUrl: './mep-bu-wiwynn-paj.component.html',
    styleUrls: ['./mep-bu-wiwynn-paj.component.scss']
})
export class MepBuWiwynnPajComponent implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: ElementRef | undefined;

    permission: Permission = this.permissionsService.getPagePermissions('mepBUWiwynnPAJ');

    tab: string = 'bu';
    tabList: Tab[] = [
        { tab: 'bu', tabName: 'mepBUWiwynnPAJ.bu', disabled: false },
        { tab: 'wiwynn', tabName: 'mepBUWiwynnPAJ.wiwynn', disabled: false }
    ];

    searchKeyWord: string = '';

    searchYear: string = '';
    searchYearList: string[] = [];

    //  表头数据
    buWiwynnTableHeaderInfo: TableHeaderInfo[] = [
        { content: 'tableHead.index', align: 'center', left: true, right: false, width: 70 },
        { content: 'tableHead.year', align: 'center', left: true, right: false, width: 80 },
        { content: 'tableHead.issueDept', align: 'center', left: true, right: false, width: 120 },
        { content: 'tableHead.issuePCode', align: 'center', left: false, right: false, width: 170 },
        { content: 'tableHead.currency', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.reviewer1', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.reviewer2', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.chargeType', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.shortRemark', align: 'center', left: false, right: false, width: 200 },
        { content: 'tableHead.remark', align: 'center', left: false, right: false, width: 200 },
        { content: 'tableHead.recvDept', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.recvPCode', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.amount', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.itemText', align: 'center', left: false, right: false, width: 250 },
        { content: 'tableHead.assignment', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.businessType', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.customerName', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.reason', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.sbgChargeType', align: 'center', left: false, right: false, width: 180 },
        { content: 'tableHead.applicant', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.pmcsIBCode', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.pmcsIBName', align: 'center', left: false, right: true, width: 250 },
        { content: 'tableHead.pajMm', align: 'center', left: false, right: true, width: 110 }
    ];

    tableInfo: TableInfo = {
        loading: false,
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 8,
        checkedAll: false,
    };

    getTableDataSubscribe: any = null;

    buWiwynnData: BUWiwynnPAJ[] = [];

    constructor(
        public title: Title,
        public translate: TranslateService,
        private ipmApiService: IpmApiService,
        public utils: UtilsService,
        public permissionsService: PermissionsService,
        private modal: NzModalService,
    ) {
        this.title.setTitle(this.translate.instant('home.mepBUWiwynnPAJ') + ' - ' + this.translate.instant('title'));
    }

    ngOnInit(): void {
        this.initPage();
    }

    initPage(flag: boolean = true) {
        this.tableInfo.loading = true;
        const initPro = new Promise<void>((resolve, reject) => {
            if (this.tab === 'bu') {
                this.ipmApiService.getBUPAJYear().subscribe((resp: any) => {
                    this.searchYearList = resp.map((item: any) => item.projectyear);
                    if (flag) {
                        const currentYear = String(new Date().getFullYear());
                        this.searchYear = this.searchYearList.findIndex(item => item === currentYear) > -1 ? currentYear : '';
                    }
                    resolve();
                })
            } else if (this.tab === 'wiwynn') {
                this.ipmApiService.getWiwynnPAJYear().subscribe((resp: any) => {
                    this.searchYearList = resp.map((item: any) => item.projectyear);
                    if (flag) {
                        const currentYear = String(new Date().getFullYear());
                        this.searchYear = this.searchYearList.findIndex(item => item === currentYear) > -1 ? currentYear : '';
                    }
                    resolve();
                })
            }
        });
        initPro.then((data) => {
            this.tableInfo.scrollX = this.buWiwynnTableHeaderInfo.map((item) => item.width).reduce((a, b) => a + b);
            this.tableInfo.pageSize = Math.floor((this.dataTable?.nativeElement.clientHeight - 64 - 48) / 50);
            this.getTableData();
        });
    }

    getTableData() {
        this.tableInfo.loading = true;
        if (this.getTableDataSubscribe) {
            this.getTableDataSubscribe.unsubscribe();
        }
        const limit = this.tableInfo.pageSize;
        const skip = (this.tableInfo.pageIndex - 1) * this.tableInfo.pageSize;
        const params = {
            filter: JSON.stringify({
                limit, skip,
                where: {
                    and: [
                        { projectYear: { ilike: `%${this.searchYear}%` } },
                        {
                            or: [
                                { applicant: { ilike: `%${this.searchKeyWord}%` } },
                                { pmcsIBCode: { ilike: `%${this.searchKeyWord}%` } },
                                { pmcsIBName: { ilike: `%${this.searchKeyWord}%` } }
                            ]
                        }
                    ],
                },
            })
        }
        if (this.tab === 'bu') {
            this.getTableDataSubscribe = this.ipmApiService.getBUPAJ(params).subscribe((resp: any) => {
                this.getTableDataResp(resp);
            });
        } else if (this.tab === 'wiwynn') {
            this.getTableDataSubscribe = this.ipmApiService.getWiwynnPAJ(params).subscribe((resp: any) => {
                this.getTableDataResp(resp);
            });
        }
    }

    getTableDataResp(resp: any) {
        this.buWiwynnData = resp.body.map((item: any) => {
            return {
                year: item.projectYear,
                issueDept: item.issueDept,
                issuePCode: item.issuePCode,
                currency: item.currency,
                reviewer1: item.reviewer1,
                reviewer2: item.reviewer2,
                chargeType: item.chargeType,
                shortRemarkE: item.shortRemark && item.shortRemark.length > 20 ? item.shortRemark.slice(0, 20) + '...' : item.shortRemark,
                shortRemark: item.shortRemark,
                remarkE: item.remark && item.remark.length > 20 ? item.remark.slice(0, 20) + '...' : item.remark,
                remark: item.remark,
                recvDept: item.recvDept,
                recvPCode: item.recvPCode,
                amount: item.amount,
                itemText: item.itemText,
                assignment: item.assignment,
                businessType: item.businessType,
                customerName: item.customerName,
                reason: item.reason,
                sbgChargeType: item.sbgChargeType,
                applicant: item.applicant,
                pmcsIBCode: item.pmcsIBCode,
                pmcsIBNameE: item.pmcsIBName && item.pmcsIBName.length > 20 ? item.pmcsIBName.slice(0, 20) + '...' : item.pmcsIBName,
                pmcsIBName: item.pmcsIBName,
                pajMm: item.pajMm,
                checked: false,
            }
        });
        this.tableInfo.pageTotal = Number(resp.headers.get('count'));
        this.tableInfo.loading = false;
    }

    tablePageIndexChange() {
        this.getTableData();
    }

    searchYearChange() {
        this.dataSearch();
    }

    dataSearch() {
        this.tableInfo.pageIndex = 1;
        this.getTableData();
    }

    tabChange() {
        this.initPage();
    }

    downloadBUWiwynn(type: string) {
        const modal: NzModalRef = this.modal.create({
            nzContent: type === 'bu' ?
                this.translate.instant('mepBUWiwynnPAJ.confirmDownloadBUNotice') :
                this.translate.instant('mepBUWiwynnPAJ.confirmDownloadWiwynnNotice'),
            nzClassName: 'confirm_delete_modal',
            nzClosable: false,
            nzCentered: true,
            nzFooter: [{
                label: this.translate.instant('button.cancel'),
                onClick: () => modal.destroy()
            }, {
                label: this.translate.instant('button.confirm'),
                type: 'primary',
                onClick: () => new Promise<void>(resolve => {
                    const params = {
                        filter: JSON.stringify({
                            where: {
                                and: [
                                    { projectYear: { ilike: `%${this.searchYear}%` } },
                                    {
                                        or: [
                                            { applicant: { ilike: `%${this.searchKeyWord}%` } },
                                            { pmcsIBCode: { ilike: `%${this.searchKeyWord}%` } },
                                            { pmcsIBName: { ilike: `%${this.searchKeyWord}%` } }
                                        ]
                                    }
                                ],
                            },
                        })
                    }
                    if (type === 'bu') {
                        this.ipmApiService.downloadBU(params).subscribe((resp: any) => {
                            resolve();
                            this.downloadBUWiwynnResp(type, resp, modal);
                        }, error => {
                            resolve();
                        });
                    } else if (type === 'wiwynn') {
                        this.ipmApiService.downloadWiwynn(params).subscribe((resp: any) => {
                            resolve();
                            this.downloadBUWiwynnResp(type, resp, modal);
                        }, error => {
                            resolve();
                        });
                    }
                })
            }]
        });
    }

    downloadBUWiwynnResp(type: string, resp: any, modal: NzModalRef) {
        if (resp.status === 200) {
            const content: Blob = new Blob([resp.body], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
            });
            let name = '';
            if (type === 'bu') {
                name = this.translate.instant('home.mepBUWiwynnPAJ') + ' - BU - ' + this.utils.getFormatDate(new Date(), 'yyyyMMdd')
            } else if (type === 'wiwynn') {
                name = this.translate.instant('home.mepBUWiwynnPAJ') + ' - Wiwynn - ' + this.utils.getFormatDate(new Date(), 'yyyyMMdd')
            }
            FileSaver.saveAs(content, name);
            modal.destroy();
        } else {
            this.utils.pagePrompt('error', 'notice.downloadFail', '');
        }
    }


}
