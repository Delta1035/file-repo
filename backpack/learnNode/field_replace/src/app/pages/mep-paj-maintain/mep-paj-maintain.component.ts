import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Permission, Tab, TableHeaderInfo, TableInfo } from '@commonDefine/common.define';
import { ActualTSSExpandData, PAJCharge, PlannedIBExpandData, ToChargePAJExpandData, TrackingReport } from '@commonDefine/mep-paj-maintain.define';
import { IpmApiService } from '@commonService/ipm-api.service';
import { PermissionsService } from '@commonService/permissions.service';
import { UtilsService } from '@commonUtils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-mep-paj-maintain',
    templateUrl: './mep-paj-maintain.component.html',
    styleUrls: ['./mep-paj-maintain.component.scss']
})
export class MepPajMaintainComponent implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: ElementRef | undefined;

    pagePermissionPajCharge: Permission = this.permissionsService.getPagePermissions('mepPAJMaintainPAJChargeManMonth');
    pagePermissionTrackingReport: Permission = this.permissionsService.getPagePermissions('mepPAJTrackingReport');

    stepNumber: number = 0;

    tab: string = 'pajCharge';
    tabList: Tab[] = this.pagePermissionTrackingReport.allowedRead ? [
        { tab: 'pajCharge', tabName: 'mepPAJMaintain.mepPAJMaintainPAJChargeManMonth', disabled: false },
        { tab: 'trackingReport', tabName: 'mepPAJMaintain.mepPAJTrackingReport', disabled: false }
    ] : [
        { tab: 'pajCharge', tabName: 'mepPAJMaintain.mepPAJMaintainPAJChargeManMonth', disabled: false }
    ];

    searchKeyWord: string = '';

    searchYear: string = '';
    searchYearList: string[] = [];

    //  表头数据
    pajChargeTableHeaderInfo: TableHeaderInfo[] = [
        { content: 'tableHead.index', align: 'center', left: true, right: false, width: 70 },
        { content: 'tableHead.year', align: 'center', left: true, right: false, width: 80 },
        { content: 'tableHead.projectName', align: 'center', left: true, right: false, width: 270 },
        { content: 'tableHead.itPm', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.planStart', align: 'center', left: false, right: false, width: 120 },
        { content: 'tableHead.planFinish', align: 'center', left: false, right: false, width: 120 },
        { content: 'tableHead.pmcsIbProjectName', align: 'center', left: false, right: false, width: 300 },
        { content: 'tableHead.misIbCode', align: 'center', left: false, right: false, width: 140 },
        { content: 'tableHead.pmcsEpProjectName', align: 'center', left: false, right: false, width: 300 },
        { content: 'tableHead.misEpCode', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.misHandleDiv', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.cancelled', align: 'center', left: false, right: true, width: 120 },
        { content: 'tableHead.operation', align: 'center', left: false, right: true, width: 110 }
    ];

    tableInfo: TableInfo = {
        loading: false,
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 8,
        checkedAll: false,
    };

    getTableDataSubscribe: any = null;

    pajChargeData: PAJCharge[] = [];
    trackingReportData: TrackingReport[] = [];

    editChargeModalData: any = {
        title: '',
        width: 1600,
        className: 'edit_charge_modal',
        show: false,
        editChargeData: {},
        canSubmit: false,
        submitLoading: false,
        onShow: () => { this.editChargeModalData.show = true },
        onCancel: (flag: boolean = false) => {
            this.editChargeModalData.show = false
            if (flag) {
                this.getTableData();
            }
        }
    }

    onePlannedIBData = {
        div: { title: '', value: '', must: false, status: false, type: 'text', },
        janPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        febPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        marPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        aprPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        mayPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        junPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        julPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        augPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        sepPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        octPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        novPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        decPlan: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
    };

    oneActualTSSData = {
        div: { title: '', value: '', must: false, status: false, type: 'text', },
        jantss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        febtss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        martss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        aprtss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        maytss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        juntss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        jultss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        augtss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        septss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        octtss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        novtss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
        dectss: { title: '', value: 0, must: false, status: false, type: 'text', step: 0.01, range: [0, 1000] },
    };

    oneToChargePAJData = {
        div: { title: '', value: '', must: true, status: false, type: 'text' },
        janPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 2 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
        febPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 3 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
        marPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 4 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
        aprPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 5 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
        mayPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 6 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
        junPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 7 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
        julPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 8 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
        augPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 9 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
        sepPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 10 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
        octPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 11 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
        novPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 12 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
        decPaj: { title: '', value: 0, must: false, status: false, type: new Date().getMonth() + 1 === 1 ? 'number' : 'text', step: 0.01, range: [0, 1000] },
    };

    constructor(
        public title: Title,
        public translate: TranslateService,
        private ipmApiService: IpmApiService,
        public utils: UtilsService,
        private modal: NzModalService,
        public permissionsService: PermissionsService,
    ) {
        this.title.setTitle(this.translate.instant('home.mepPAJMaintain') + ' - ' + this.translate.instant('title'));
    }

    ngOnInit(): void {
        this.initPage();
    }

    initPage(flag: boolean = true) {
        this.tableInfo.loading = true;
        const initPro = new Promise<void>((resolve, reject) => {
            this.ipmApiService.tssesException().subscribe((resp: any) => {
                switch (resp.stage) {
                    case 'complete':
                        this.stepNumber = 1;
                        break;
                    case 'upload':
                    case 'uploading':
                        this.stepNumber = 2;
                        break;
                    case 'uploaded':
                        this.stepNumber = 3;
                        break;
                    case 'maintain':
                        this.stepNumber = 4;
                        break;
                    default:
                        this.stepNumber = 0;
                        break;
                }
            })
            this.ipmApiService.getIBProjectYears().subscribe((resp: any) => {
                this.searchYearList = resp.map((item: any) => item.projectyear);
                if (flag) {
                    const currentYear = String(new Date().getFullYear());
                    this.searchYear = this.searchYearList.findIndex(item => item === currentYear) > -1 ? currentYear : '';
                }
                resolve();
            })
        });
        initPro.then((data) => {
            this.tableInfo.scrollX = this.pajChargeTableHeaderInfo.map((item) => item.width).reduce((a, b) => a + b);
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
        if (this.tab === 'pajCharge') {
            this.getTableDataSubscribe = this.ipmApiService.getPAJChargeData({
                filter: JSON.stringify({
                    limit, skip,
                    where: {
                        and: [
                            { projectYear: { ilike: `%${this.searchYear}%` } },
                            {
                                or: [
                                    { projectName: { ilike: `%${this.searchKeyWord}%` } },
                                    { itPm: { ilike: `%${this.searchKeyWord}%` } },
                                    { misHandleDiv: { ilike: `%${this.searchKeyWord}%` } }
                                ]
                            }
                        ],
                    },
                })
            }).subscribe((resp: any) => {
                this.pajChargeData = resp.body.map((item: any) => {
                    return {
                        id: item.id,
                        year: item.projectYear,
                        projectName: item.projectName,
                        itPm: item.itPm,
                        planStart: item.planStartDate,
                        planFinish: item.planFinishDate,
                        pmcsIbProjectName: item.pmcsIbProjectName,
                        misIbCode: item.misIbCode,
                        pmcsEpProjectName: item.pmcsEpProjectName,
                        misEpCode: item.misEpCode,
                        misHandleDiv: item.misHandleDiv,
                        cancelled: item.cancelled,
                        completed: item.completed,
                        monthlyPajManMonthsUpdated: item.monthlyPajManMonthsUpdated,
                        monthlyPajDone: item.monthlyPajDone,
                        plannedIBData: item.ibLns ? item.ibLns.map((iter: any) => {
                            return {
                                div: iter.div,
                                janPlan: Number(iter.janPlan),
                                febPlan: Number(iter.febPlan),
                                marPlan: Number(iter.marPlan),
                                aprPlan: Number(iter.aprPlan),
                                mayPlan: Number(iter.mayPlan),
                                junPlan: Number(iter.junPlan),
                                julPlan: Number(iter.julPlan),
                                augPlan: Number(iter.augPlan),
                                sepPlan: Number(iter.sepPlan),
                                octPlan: Number(iter.octPlan),
                                novPlan: Number(iter.novPlan),
                                decPlan: Number(iter.decPlan),
                            }
                        }) : [],
                        actualTSSData: item.actualTssMonthdiv ? item.actualTssMonthdiv.map((iter: any) => {
                            return {
                                div: iter.div,
                                jantss: Number(iter.jantss),
                                febtss: Number(iter.febtss),
                                martss: Number(iter.martss),
                                aprtss: Number(iter.aprtss),
                                maytss: Number(iter.maytss),
                                juntss: Number(iter.juntss),
                                jultss: Number(iter.jultss),
                                augtss: Number(iter.augtss),
                                septss: Number(iter.septss),
                                octtss: Number(iter.octtss),
                                novtss: Number(iter.novtss),
                                dectss: Number(iter.dectss),
                            }
                        }) : [],
                        toChargePAJData: item.pajLns ? item.pajLns.map((iter: any) => {
                            return {
                                id: iter.id,
                                div: iter.div,
                                janPaj: Number(iter.janPaj),
                                febPaj: Number(iter.febPaj),
                                marPaj: Number(iter.marPaj),
                                aprPaj: Number(iter.aprPaj),
                                mayPaj: Number(iter.mayPaj),
                                junPaj: Number(iter.junPaj),
                                julPaj: Number(iter.julPaj),
                                augPaj: Number(iter.augPaj),
                                sepPaj: Number(iter.sepPaj),
                                octPaj: Number(iter.octPaj),
                                novPaj: Number(iter.novPaj),
                                decPaj: Number(iter.decPaj),
                            }
                        }) : [],
                        checked: false,
                        expand: false
                    }
                });
                this.tableInfo.pageTotal = Number(resp.headers.get('count'));
                this.tableInfo.loading = false;
            });
        } else if (this.tab === 'trackingReport') {
            this.getTableDataSubscribe = this.ipmApiService.getTrackingReportData({
                filter: JSON.stringify({
                    limit, skip,
                    where: {
                        and: [
                            { projectYear: { ilike: `%${this.searchYear}%` } },
                            {
                                or: [
                                    { projectName: { ilike: `%${this.searchKeyWord}%` } },
                                    { itPm: { ilike: `%${this.searchKeyWord}%` } },
                                    { misHandleDiv: { ilike: `%${this.searchKeyWord}%` } }
                                ]
                            }
                        ],
                    },
                })
            }).subscribe((resp: any) => {
                this.trackingReportData = resp.body.map((item: any) => {
                    return {
                        id: item.id,
                        year: item.projectYear,
                        projectName: item.projectName,
                        itPm: item.itPm,
                        pmcsIbProjectName: item.pmcsIbProjectName,
                        misIbCode: item.misIbCode,
                        cancelled: item.cancelled,
                        completed: item.completed,
                        monthlyPajDone: item.monthlyPajDone,
                        recvChargeDept: item.recvChargeDept,
                        bo: item.bo,
                    }
                });
                this.tableInfo.pageTotal = Number(resp.headers.get('count'));
                this.tableInfo.loading = false;
            });
        }
    }

    tablePageIndexChange() {
        this.getTableData();
    }

    searchYearChange() {
        this.dataSearch();
    }

    // 模糊查询
    dataSearch() {
        this.tableInfo.pageIndex = 1;
        this.getTableData();
    }

    tabChange() {
        this.getTableData();
    }

    editChargeData(data: PAJCharge) {
        this.editChargeModalData.title = 'mepPAJMaintain.maintainPAJ';
        this.editChargeModalData.editChargeData.id = data.id;
        this.editChargeModalData.editChargeData.monthlyPajDone = data.monthlyPajDone;
        this.editChargeModalData.editChargeData.inputData = [
            { title: 'tableHead.year', value: this.utils.getFormatDate(data.year, 'yyyy'), must: false, status: false, type: 'text' },
            { title: 'tableHead.projectName', value: data.projectName, must: false, status: false, type: 'text' },
            { title: 'tableHead.misIbCode', value: data.misIbCode, must: false, status: false, type: 'text' },
            { title: 'tableHead.pmcsIbProjectName', value: data.pmcsIbProjectName, must: false, status: false, type: 'text' },
        ];
        this.editChargeModalData.editChargeData.plannedIBDataShow = false;
        this.editChargeModalData.editChargeData.plannedIBData = data.plannedIBData.map((item: PlannedIBExpandData) => {
            const taregt = this.utils.deepClone(this.onePlannedIBData);
            taregt.div.value = item.div;
            taregt.janPlan.value = item.janPlan;
            taregt.febPlan.value = item.febPlan;
            taregt.marPlan.value = item.marPlan;
            taregt.aprPlan.value = item.aprPlan;
            taregt.mayPlan.value = item.mayPlan;
            taregt.junPlan.value = item.junPlan;
            taregt.julPlan.value = item.julPlan;
            taregt.augPlan.value = item.augPlan;
            taregt.sepPlan.value = item.sepPlan;
            taregt.octPlan.value = item.octPlan;
            taregt.novPlan.value = item.novPlan;
            taregt.decPlan.value = item.decPlan;
            return taregt
        });
        this.editChargeModalData.editChargeData.actualTSSDataShow = true;
        this.editChargeModalData.editChargeData.actualTSSData = data.actualTSSData.map((item: ActualTSSExpandData) => {
            const taregt = this.utils.deepClone(this.oneActualTSSData);
            taregt.div.value = item.div;
            taregt.jantss.value = item.jantss;
            taregt.febtss.value = item.febtss;
            taregt.martss.value = item.martss;
            taregt.aprtss.value = item.aprtss;
            taregt.maytss.value = item.maytss;
            taregt.juntss.value = item.juntss;
            taregt.jultss.value = item.jultss;
            taregt.augtss.value = item.augtss;
            taregt.septss.value = item.septss;
            taregt.octtss.value = item.octtss;
            taregt.novtss.value = item.novtss;
            taregt.dectss.value = item.dectss;
            return taregt
        });
        this.editChargeModalData.editChargeData.toChargePAJDataShow = true;
        this.editChargeModalData.editChargeData.toChargePAJData = data.toChargePAJData.map((item: ToChargePAJExpandData) => {
            const taregt = this.utils.deepClone(this.oneToChargePAJData);
            taregt.id = item.id;
            taregt.div.value = item.div;
            taregt.janPaj.value = item.janPaj;
            taregt.febPaj.value = item.febPaj;
            taregt.marPaj.value = item.marPaj;
            taregt.aprPaj.value = item.aprPaj;
            taregt.mayPaj.value = item.mayPaj;
            taregt.junPaj.value = item.junPaj;
            taregt.julPaj.value = item.julPaj;
            taregt.augPaj.value = item.augPaj;
            taregt.sepPaj.value = item.sepPaj;
            taregt.octPaj.value = item.octPaj;
            taregt.novPaj.value = item.novPaj;
            taregt.decPaj.value = item.decPaj;
            return taregt
        });
        this.editChargeModalData.onShow();
        this.editChargeModalData.canSubmit = true;
    }

    toChargePAJDataAdd() {
        this.editChargeModalData.editChargeData.toChargePAJData = Array.prototype.concat(
            ... this.editChargeModalData.editChargeData.toChargePAJData,
            this.utils.deepClone(this.oneToChargePAJData)
        )
    }

    toChargePAJDataSubmitTimmer: any = null;
    toChargePAJDataSubmitSubscribe: any = null;

    toChargePAJDataChange(event: any, index: number, targetName: string) {
        if (event.flag) {
            if (this.toChargePAJDataSubmitSubscribe) {
                this.toChargePAJDataSubmitSubscribe.unsubscribe();
            }
            if (this.toChargePAJDataSubmitTimmer) {
                clearTimeout(this.toChargePAJDataSubmitTimmer);
            }
            this.toChargePAJDataSubmitTimmer = setTimeout(() => {
                const target = this.editChargeModalData.editChargeData.toChargePAJData[index];
                this.toChargePAJDataSubmitSubscribe = this.ipmApiService.editChargeToChargePAJData(
                    target.id,
                    { [targetName]: target[targetName].value ? target[targetName].value : 0 }
                ).subscribe((resp: any) => {
                    if (resp.status === 204) {
                        // this.utils.pagePrompt('success', 'notice.updateSuccess', '');
                    } else {
                        this.utils.pagePrompt('error', 'notice.updateFail', '');
                    }
                });
            }, 500);
        }
    }

    editChargeCheckCanSubmit() {
        this.editChargeModalData.canSubmit = true;
    }

    editChargeSubmit() {
        this.editChargeModalData.submitLoading = true;
        this.ipmApiService.editIB(this.editChargeModalData.editChargeData.id, {
            monthlyPajDone: this.editChargeModalData.editChargeData.monthlyPajDone
        }).subscribe((resp: any) => {
            this.editChargeModalData.submitLoading = false;
            if (resp.status === 204) {
                this.utils.pagePrompt('success', 'notice.updateSuccess', '');
                this.editChargeModalData.onCancel(true);
            } else {
                this.utils.pagePrompt('error', 'notice.updateFail', '');
            }
        }, error => {
            this.editChargeModalData.submitLoading = false;
        })

    }

    editChargeModalCancelClick() {
        this.editChargeModalData.onCancel(true);
    }

    gotoCompleteLoading: boolean = false;

    gotoComplete() {
        this.gotoCompleteLoading = true;
        this.ipmApiService.gotoComplete().subscribe((resp: any) => {
            this.gotoCompleteLoading = false;
            if (resp.status === 204 || resp.status === 200) {
                this.utils.pagePrompt('success', 'notice.operationSuccess', '');
                this.initPage();
            } else {
                this.utils.pagePrompt('error', 'notice.operationFail', '');
            }
        }, error => {
            this.gotoCompleteLoading = false;
        })
    }


}
