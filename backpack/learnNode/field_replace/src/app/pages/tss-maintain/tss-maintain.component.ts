import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Permission, TableHeaderInfo, TableInfo } from '@commonDefine/common.define';
import { IBInfo } from '@commonDefine/ib.define';
import { IpmApiService } from '@commonService/ipm-api.service';
import { PermissionsService } from '@commonService/permissions.service';
import { UtilsService } from '@commonUtils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-tss-maintain',
    templateUrl: './tss-maintain.component.html',
    styleUrls: ['./tss-maintain.component.scss']
})
export class TssMaintainComponent implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: ElementRef | undefined;

    pagePermission: Permission = this.permissionsService.getPagePermissions('tssMaintain')

    searchKeyWord: string = '';

    searchYear: string = '';
    searchYearList: string[] = [];

    //  表头数据
    ibTableHeaderInfo: TableHeaderInfo[] = [
        { content: 'tableHead.index', align: 'center', left: true, right: false, width: 70 },
        { content: 'tableHead.year', align: 'center', left: true, right: false, width: 80 },
        { content: 'tableHead.projectName', align: 'center', left: true, right: false, width: 270 },
        { content: 'tableHead.itPm', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.planStart', align: 'center', left: false, right: false, width: 120 },
        { content: 'tableHead.planFinish', align: 'center', left: false, right: false, width: 120 },
        { content: 'tableHead.totalPlanMm', align: 'center', left: false, right: false, width: 140 },
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

    ibData: IBInfo[] = [];

    newIBModalData: any = {
        title: '',
        width: 1600,
        className: 'new_ib_modal',
        type: '',
        show: false,
        newPRFData: {},
        canSubmit: false,
        submitLoading: false,
        onShow: () => { this.newIBModalData.show = true },
        onCancel: () => { this.newIBModalData.show = false }
    }

    constructor(
        public title: Title,
        public translate: TranslateService,
        private ipmApiService: IpmApiService,
        public utils: UtilsService,
        private modal: NzModalService,
        public permissionsService: PermissionsService,
    ) {
        this.title.setTitle(this.translate.instant('home.tssMaintain') + ' - ' + this.translate.instant('title'));
    }

    ngOnInit(): void {
        this.initPage();
    }

    // 页面初始化
    initPage(flag: boolean = true) {
        this.tableInfo.loading = true;
        const initPro = new Promise<void>((resolve, reject) => {
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
            this.tableInfo.scrollX = this.ibTableHeaderInfo.map((item) => item.width).reduce((a, b) => a + b);
            this.tableInfo.pageSize = Math.floor((this.dataTable?.nativeElement.clientHeight - 64 - 48) / 50);
            this.getTableData();
        });
    }

    getTableData() {
        this.tableInfo.loading = true;
        const limit = this.tableInfo.pageSize;
        const skip = (this.tableInfo.pageIndex - 1) * this.tableInfo.pageSize;
        this.ipmApiService.getIB({
            filter: JSON.stringify({
                limit, skip,
                order: ['projectYear DESC', 'itPm ASC'],
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
                include: [{ relation: "ibLns" }]
            })
        }).subscribe((resp: any) => {
            this.ibData = resp.body.map((item: any) => {
                return {
                    id: item.id,
                    year: item.projectYear,
                    projectName: item.projectName,
                    itPm: item.itPm,
                    planStart: item.planStartDate,
                    planFinish: item.planFinishDate,
                    totalPlanMm: item.totalPlanMm,
                    pmcsIbProjectName: item.pmcsIbProjectName,
                    misIbCode: item.misIbCode,
                    pmcsEpProjectName: item.pmcsEpProjectName,
                    misEpCode: item.misEpCode,
                    misHandleDiv: item.misHandleDiv,
                    cancelled: item.cancelled,
                    expandData: item.ibLns ? item.ibLns.map((iter: any) => {
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
                    checked: false,
                    expand: false
                }
            })
            this.tableInfo.pageTotal = Number(resp.headers.get('count'));
            this.tableInfo.loading = false;
        })
    }

    // 切换页码
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

    newIBStart(type: string, data?: IBInfo) {
        this.newIBModalData.type = type;
        if (type === 'edit') {
            this.newIBModalData.title = 'tssMaintain.editIB';
        }
        this.newIBModalData.newPRFData.ibId = data?.id;
        this.newIBModalData.newPRFData.noInputData = [
            { title: 'tableHead.year', value: this.utils.getFormatDate(data?.year, 'yyyy'), must: false, status: false, type: 'text' },
            { title: 'tableHead.projectName', value: data?.projectName, must: false, status: false, type: 'text' },
            { title: 'tableHead.itPm', value: data?.itPm, must: false, status: false, type: 'text' },
            { title: 'tableHead.planStart', value: this.utils.getFormatDate(data?.planStart, 'yyyy/MM/dd'), must: false, status: false, type: 'text' },
            { title: 'tableHead.planFinish', value: this.utils.getFormatDate(data?.planFinish, 'yyyy/MM/dd'), must: false, status: false, type: 'text' },
            { title: 'tableHead.totalPlanMm', value: data?.totalPlanMm, must: false, status: false, type: 'text' },
            { title: 'tableHead.pmcsEpProjectName', value: data?.pmcsEpProjectName, must: false, status: false, type: 'text' },
            { title: 'tableHead.misEpCode', value: data?.misEpCode, must: false, status: false, type: 'text' },
            { title: 'tableHead.misHandleDiv', value: data?.misHandleDiv, must: false, status: false, type: 'text' },
        ];
        this.newIBModalData.newPRFData.inputData = [
            { title: 'tableHead.pmcsIbProjectName', value: data?.pmcsIbProjectName, must: true, status: false, type: 'input' },
            { title: 'tableHead.misIbCode', value: data?.misIbCode, must: true, status: false, type: 'input' },
        ];
        this.newIBModalData.onShow();
    }

    newIBInputDataChange(item: any) {
        if (this.newIBModalData.type === 'edit') {

        }
        this.newIBCheckCanSubmit();
    }

    newIBCheckCanSubmit() {
        let inputDataCanSubmit = false;
        if (this.newIBModalData.type === 'edit') {
            inputDataCanSubmit = this.newIBModalData.newPRFData.inputData.findIndex((item: any) => !item.status) === -1;
            this.newIBModalData.canSubmit = inputDataCanSubmit;
        }
    }

    newIBSubmit() {
        this.newIBModalData.submitLoading = true;
        if (this.newIBModalData.type === 'edit') {
            this.ipmApiService.editIB(this.newIBModalData.newPRFData.ibId, {
                pmcsIbProjectName: this.newIBModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.pmcsIbProjectName').value,
                misIbCode: this.newIBModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.misIbCode').value,
            }).subscribe((resp: any) => {
                this.newIBModalData.submitLoading = false;
                if (resp.status === 204) {
                    this.utils.pagePrompt('success', 'notice.updateSuccess', '');
                    this.newPRFEnd();
                } else {
                    this.utils.pagePrompt('error', 'notice.updateFail', '');
                }
            }, error => {
                this.newIBModalData.submitLoading = false;
            })
        }
    }

    newPRFEnd() {
        this.newIBModalData.onCancel();
        setTimeout(() => {
            this.newIBModalData.newBudgetData = {
                inputData: [],
                tableData: []
            };
            this.tableInfo.pageIndex = 1;
            this.getTableData();
        }, 0);
    }

}
