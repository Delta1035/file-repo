import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { PRFExpandData, PRFInfo } from '@commonDefine/prf.define';
import { Permission, TableHeaderInfo, TableInfo } from '@commonDefine/common.define';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { IpmApiService } from '@commonService/ipm-api.service';
import { UtilsService } from '@commonUtils/utils.service';
import { PermissionsService } from '@commonService/permissions.service';

@Component({
    selector: 'app-budget-prf',
    templateUrl: './budget-prf.component.html',
    styleUrls: ['./budget-prf.component.scss'],
})
export class BudgetPrfComponent implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: ElementRef | undefined;

    pagePermission: Permission = this.permissionsService.getPagePermissions('budgetPRF')

    searchKeyWord: string = '';

    searchYear: string = '';
    searchYearList: string[] = [];

    //  表头数据
    prfTableHeaderInfo: TableHeaderInfo[] = [
        { content: 'tableHead.index', align: 'center', left: true, right: false, width: 70 },
        { content: 'tableHead.year', align: 'center', left: true, right: false, width: 80 },
        { content: 'tableHead.projectName', align: 'center', left: true, right: false, width: 270 },
        { content: 'tableHead.itPm', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.bizOwner', align: 'center', left: false, right: false, width: 140 },
        { content: 'tableHead.contactWindow', align: 'center', left: false, right: false, width: 180 },
        { content: 'tableHead.bu', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.bg', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.bo', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.customer', align: 'center', left: false, right: false, width: 120 },
        { content: 'tableHead.site', align: 'center', left: false, right: false, width: 120 },
        { content: 'tableHead.planStart', align: 'center', left: false, right: false, width: 120 },
        { content: 'tableHead.planFinish', align: 'center', left: false, right: false, width: 120 },
        { content: 'tableHead.recvEpCode', align: 'center', left: false, right: false, width: 170 },
        { content: 'tableHead.recvChargeDept', align: 'center', left: false, right: false, width: 170 },
        { content: 'tableHead.projectCategory', align: 'center', left: false, right: false, width: 160 },
        { content: 'tableHead.projectType', align: 'center', left: false, right: false, width: 170 },
        { content: 'tableHead.misHandleDiv', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.projectNameMerged', align: 'center', left: false, right: false, width: 240 },
        { content: 'tableHead.misEpCode', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.pmcsEpProjectNameMerged', align: 'center', left: false, right: false, width: 240 },
        { content: 'tableHead.split', align: 'center', left: false, right: false, width: 90 },
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

    prfData: PRFInfo[] = [];

    newPRFModalData: any = {
        title: '',
        width: 1600,
        className: 'new_prf_modal',
        type: '',
        show: false,
        newPRFData: {},
        canSubmit: false,
        submitLoading: false,
        onShow: () => { this.newPRFModalData.show = true },
        onCancel: () => { this.newPRFModalData.show = false }
    }

    boList: any[] = [];

    divList: any[] = [];
    projectCategoriesList: any[] = [];
    projectTypesList: any[] = [];
    misHandleDivList: any[] = [];

    oneNewPRFTableData = {
        div: {
            title: '', value: '', must: true, status: false, type: 'select', selectSearch: true, list: [{}],
        },
        janBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
        febBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
        marBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
        aprBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
        mayBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
        junBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
        julBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
        augBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
        sepBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
        octBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
        novBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
        decBudget: { title: '', value: 0, must: false, status: false, type: 'number', step: 0.5, range: [0, 1000] },
    };

    constructor(
        public title: Title,
        public translate: TranslateService,
        private ipmApiService: IpmApiService,
        public utils: UtilsService,
        private modal: NzModalService,
        public permissionsService: PermissionsService,
    ) {
        this.title.setTitle(this.translate.instant('home.budgetPRF') + ' - ' + this.translate.instant('title'));
    }

    ngOnInit(): void {
        this.initPage();
    }

    // 页面初始化
    initPage(flag: boolean = true) {
        this.tableInfo.loading = true;
        const initPro = new Promise<void>((resolve, reject) => {
            this.ipmApiService.getBasicData({
                filter: JSON.stringify({
                    include: [{ relation: 'bgs', scope: { include: [{ relation: 'bus', },], }, },],
                }),
            }).subscribe((resp: any) => {
                this.boList = resp.map((item: any) => {
                    return {
                        value: item.bo, text: item.bo,
                        children: item.bgs && item.bgs.length > 0 ? item.bgs.map((iter: any) => {
                            return {
                                value: iter.bg, text: iter.bg,
                                children: iter.bus && iter.bus.length > 0 ? iter.bus.map((ele: any) => {
                                    return {
                                        value: ele.bu, text: ele.bu,
                                    }
                                }) : []
                            }
                        }) : []
                    }
                })
            });
            this.ipmApiService.getResources().subscribe((resp: any) => {
                const arr = Array.from(new Set(resp.map((item: any) => item.divName)));
                this.divList = arr.map((item: any) => {
                    return {
                        value: item, text: item
                    }
                })
            })
            this.ipmApiService.getProjectCategories().subscribe((resp: any) => {
                this.projectCategoriesList = resp.map((item: any) => {
                    return {
                        value: item.name, text: item.name
                    }
                })
            })
            this.ipmApiService.getProjectTypes().subscribe((resp: any) => {
                this.projectTypesList = resp.map((item: any) => {
                    return {
                        value: item.name, text: item.name
                    }
                })
            })
            this.ipmApiService.getDivs().subscribe((resp: any) => {
                this.misHandleDivList = resp.map((item: any) => {
                    return {
                        value: item.name, text: item.divCode
                    }
                })
            })
            this.ipmApiService.getPRFProjectYears().subscribe((resp: any) => {
                this.searchYearList = resp.map((item: any) => item.projectyear);
                if (flag) {
                    const currentYear = String(new Date().getFullYear());
                    this.searchYear = this.searchYearList.findIndex(item => item === currentYear) > -1 ? currentYear : '';
                }
                resolve();
            })
        });
        initPro.then((data) => {
            this.tableInfo.scrollX = this.prfTableHeaderInfo.map((item) => item.width).reduce((a, b) => a + b);
            this.tableInfo.pageSize = Math.floor((this.dataTable?.nativeElement.clientHeight - 64 - 48) / 50);
            this.getTableData();
        });
    }

    // 获取数据
    getTableData() {
        this.tableInfo.loading = true;
        const limit = this.tableInfo.pageSize;
        const skip = (this.tableInfo.pageIndex - 1) * this.tableInfo.pageSize;
        this.ipmApiService.getPRF({
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
                include: [{ relation: "prfLns" }]
            })
        }).subscribe((resp: any) => {
            this.prfData = resp.body.map((item: any) => {
                return {
                    id: item.id,
                    year: item.projectYear,
                    projectName: item.projectName,
                    itPm: item.itPm,
                    bizOwner: item.bizOwner,
                    contactWindow: item.contactWindow,
                    bu: item.bu,
                    bg: item.bg,
                    bo: item.bo,
                    customer: item.customer,
                    site: item.site,
                    planStart: item.planStartDate,
                    planFinish: item.planFinishDate,
                    recvEpCode: item.recvEpCode,
                    recvChargeDept: item.recvChargeDept,
                    projectCategory: item.projectCategory,
                    projectType: item.projectType,
                    misHandleDiv: item.misHandleDiv,
                    projectNameMerged: item.projectNameMerged,
                    misEpCode: item.misEpCode,
                    pmcsEpProjectNameMerged: item.pmcsEpProjectNameMerged,
                    split: item.split,
                    comments: item.comments,
                    cancelled: item.cancelled,
                    ibStatus: item.status,
                    budgetSystemRecvChargeDept: item.budgetSystemRecvChargeDept,
                    expandData: item.prfLns ? item.prfLns.map((iter: any) => {
                        return {
                            div: iter.div,
                            janBudget: Number(iter.janBudget),
                            febBudget: Number(iter.febBudget),
                            marBudget: Number(iter.marBudget),
                            aprBudget: Number(iter.aprBudget),
                            mayBudget: Number(iter.mayBudget),
                            junBudget: Number(iter.junBudget),
                            julBudget: Number(iter.julBudget),
                            augBudget: Number(iter.augBudget),
                            sepBudget: Number(iter.sepBudget),
                            octBudget: Number(iter.octBudget),
                            novBudget: Number(iter.novBudget),
                            decBudget: Number(iter.decBudget),
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

    cancelPRF(item: PRFInfo) {
        this.ipmApiService.editEP(item.id, {
            cancelled: item.cancelled
        }).subscribe((resp: any) => {
            if (resp.status === 204) {
                this.utils.pagePrompt('success', 'notice.operationSuccess', '');
            } else {
                this.utils.pagePrompt('error', 'notice.operationFail', '');
            }
        })
    }

    newPRFStart(type: string, data?: PRFInfo) {
        this.newPRFModalData.type = type;
        if (type === 'new') {
            this.newPRFModalData.title = 'budgetPRF.addNewPRF';
        } else if (type === 'edit') {
            this.newPRFModalData.title = 'budgetPRF.editPRF';
        } else if (type === 'editEP') {
            this.newPRFModalData.title = 'budgetPRF.editEP';
        }
        this.newPRFModalData.newPRFData.inputData = type === 'editEP' ? [
            { title: 'tableHead.year', value: this.utils.getFormatDate(data?.year, 'yyyy'), must: false, status: false, type: 'text' },
            { title: 'tableHead.projectName', value: data?.projectName, must: false, status: false, type: 'text' },
            { title: 'tableHead.itPm', value: data?.itPm, must: false, status: false, type: 'text' },
            { title: 'tableHead.bizOwner', value: data?.bizOwner, must: false, status: false, type: 'text' },
            { title: 'tableHead.contactWindow', value: data?.contactWindow, must: false, status: false, type: 'text' },
            { title: 'tableHead.bo', value: data?.bo, must: false, status: false, type: 'text' },
            { title: 'tableHead.bg', value: data?.bg, must: false, status: false, type: 'text' },
            { title: 'tableHead.bu', value: data?.bu, must: false, status: false, type: 'text' },
            { title: 'tableHead.customer', value: data?.customer, must: false, status: false, type: 'text' },
            { title: 'tableHead.site', value: data?.site, must: false, status: false, type: 'text' },
            { title: 'tableHead.planStart', value: this.utils.getFormatDate(data?.planStart, 'yyyy/MM/dd'), must: false, status: false, type: 'text' },
            { title: 'tableHead.planFinish', value: this.utils.getFormatDate(data?.planFinish, 'yyyy/MM/dd'), must: false, status: false, type: 'text' },
            { title: 'tableHead.recvEpCode', value: data?.recvEpCode, must: false, status: false, type: 'text' },
            { title: 'tableHead.recvChargeDept', value: data?.recvChargeDept, must: false, status: false, type: 'text' },
            { title: 'tableHead.projectCategory', value: data?.projectCategory, must: false, status: false, type: 'text' },
            { title: 'tableHead.projectType', value: data?.projectType, must: false, status: false, type: 'text' },
            { title: 'tableHead.misHandleDiv', value: data?.misHandleDiv, must: false, status: false, type: 'text' },
            { title: 'tableHead.comments', value: data?.comments, must: false, status: false, type: 'text' },
        ] : [
            { title: 'tableHead.year', value: type === 'edit' ? new Date(String(data?.year)) : new Date(String(new Date().getFullYear() + 1)), must: true, status: false, type: 'year' },
            { title: 'tableHead.projectName', value: type === 'edit' ? data?.projectName : '', must: true, status: false, type: 'input' },
            { title: 'tableHead.itPm', value: type === 'edit' ? data?.itPm : '', must: true, status: false, type: 'input' },
            { title: 'tableHead.bizOwner', value: type === 'edit' ? data?.bizOwner : '', must: true, status: false, type: 'input' },
            { title: 'tableHead.contactWindow', value: type === 'edit' ? data?.contactWindow : '', must: true, status: false, type: 'input' },
            { title: 'tableHead.bo', value: type === 'edit' ? data?.bo : '', must: true, status: false, type: 'select', list: this.boList },
            { title: 'tableHead.bg', value: type === 'edit' ? data?.bg : '', must: true, status: false, type: 'select', list: type === 'edit' ? [{ value: data?.bg, text: data?.bg }] : [] },
            { title: 'tableHead.bu', value: type === 'edit' ? data?.bu : '', must: true, status: false, type: 'select', list: type === 'edit' ? [{ value: data?.bu, text: data?.bu }] : [] },
            { title: 'tableHead.customer', value: type === 'edit' ? data?.customer : '', must: false, status: false, type: 'input' },
            { title: 'tableHead.site', value: type === 'edit' ? data?.site : '', must: true, status: false, type: 'input' },
            { title: 'tableHead.planStart', value: type === 'edit' ? new Date(String(data?.planStart)) : new Date(new Date().getFullYear() + 1, 0, 1), must: true, status: false, type: 'date' },
            { title: 'tableHead.planFinish', value: type === 'edit' ? new Date(String(data?.planFinish)) : new Date(new Date().getFullYear() + 2, 0, 1, 0, 0, -1), must: true, status: false, type: 'date' },
            { title: 'tableHead.recvEpCode', value: type === 'edit' ? data?.recvEpCode : '', must: false, status: false, type: 'input' },
            { title: 'tableHead.recvChargeDept', value: type === 'edit' ? data?.recvChargeDept : '', must: true, status: false, type: 'input' },
            { title: 'tableHead.projectCategory', value: type === 'edit' ? data?.projectCategory : '', must: true, status: false, type: 'select', list: this.projectCategoriesList },
            { title: 'tableHead.projectType', value: type === 'edit' ? data?.projectType : '', must: true, status: false, type: 'select', list: this.projectTypesList },
            { title: 'tableHead.misHandleDiv', value: type === 'edit' ? data?.misHandleDiv : '', must: true, status: false, type: 'select', list: this.misHandleDivList },
            { title: 'tableHead.comments', value: type === 'edit' ? data?.comments : '', must: false, status: false, type: 'input' },
        ];
        this.newPRFModalData.newPRFData.inputEPData = type === 'editEP' ? [
            { title: 'tableHead.projectNameMerged', value: data?.projectNameMerged, must: false, status: false, type: 'input' },
            { title: 'tableHead.misEpCode', value: data?.misEpCode, must: true, status: false, type: 'input' },
            { title: 'tableHead.pmcsEpProjectNameMerged', value: data?.pmcsEpProjectNameMerged, must: true, status: false, type: 'input' },
            { title: 'tableHead.split', value: data?.split, must: true, status: false, type: 'number', range: [0, 100] },
        ] : [
            { title: 'tableHead.projectNameMerged', value: type === 'edit' ? data?.projectNameMerged : '', must: false, status: false, type: 'text' },
            { title: 'tableHead.misEpCode', value: type === 'edit' ? data?.misEpCode : '', must: false, status: false, type: 'text' },
            { title: 'tableHead.pmcsEpProjectNameMerged', value: type === 'edit' ? data?.pmcsEpProjectNameMerged : '', must: false, status: false, type: 'text' },
            { title: 'tableHead.split', value: type === 'edit' ? data?.split : 100, must: false, status: false, type: 'text' },
        ];
        this.oneNewPRFTableData.div.list = this.divList;
        this.newPRFModalData.newPRFData.tableData = type === 'edit' || type === 'editEP' ? data?.expandData.map((item: PRFExpandData) => {
            const taregt = this.utils.deepClone(this.oneNewPRFTableData);
            taregt.prfId = data.id;
            taregt.div.value = item.div;
            taregt.janBudget.value = item.janBudget;
            taregt.febBudget.value = item.febBudget;
            taregt.marBudget.value = item.marBudget;
            taregt.aprBudget.value = item.aprBudget;
            taregt.mayBudget.value = item.mayBudget;
            taregt.junBudget.value = item.junBudget;
            taregt.julBudget.value = item.julBudget;
            taregt.augBudget.value = item.augBudget;
            taregt.sepBudget.value = item.sepBudget;
            taregt.octBudget.value = item.octBudget;
            taregt.novBudget.value = item.novBudget;
            taregt.decBudget.value = item.decBudget;
            return taregt
        }) : [this.utils.deepClone(this.oneNewPRFTableData)];
        this.newPRFModalData.newPRFData.otherData = {
            budgetSystemRecvChargeDept: type === 'edit' ? data?.budgetSystemRecvChargeDept : 'no need'
        }
        this.newPRFModalData.onShow();
    }

    newPRFInputDataChange(item: any) {
        if (this.newPRFModalData.type === 'new' || this.newPRFModalData.type === 'edit') {
            if (item.title === 'tableHead.bo') {
                const bgItemList = this.newPRFModalData.newPRFData.inputData.find((iter: any) => iter.title === 'tableHead.bg').list;
                const buItemList = this.newPRFModalData.newPRFData.inputData.find((iter: any) => iter.title === 'tableHead.bu').list;
                bgItemList.length = 0;
                buItemList.length = 0;
                const targetList = item.value ? this.boList.find(iter => iter.value === item.value).children : [];
                targetList.forEach((iter: any) => { bgItemList.push({ value: iter.value, text: iter.text }) });
                const bgItemValue = this.newPRFModalData.newPRFData.inputData.find((iter: any) => iter.title === 'tableHead.bg').value;
                if (bgItemValue && bgItemList.findIndex((iter: any) => iter.value === bgItemValue) === -1) {
                    this.newPRFModalData.newPRFData.inputData.find((iter: any) => iter.title === 'tableHead.bg').value = '';
                    this.newPRFModalData.newPRFData.inputData.find((iter: any) => iter.title === 'tableHead.bu').value = '';
                }
            } else if (item.title === 'tableHead.bg') {
                let boItemValue = this.newPRFModalData.newPRFData.inputData.find((iter: any) => iter.title === 'tableHead.bo').value;
                const buItemList = this.newPRFModalData.newPRFData.inputData.find((iter: any) => iter.title === 'tableHead.bu').list;
                buItemList.length = 0;
                const targetList = item.value ? this.boList.find(iter => iter.value === boItemValue).children.find((ele: any) => ele.value === item.value).children : [];
                targetList.forEach((iter: any) => { buItemList.push({ value: iter.value, text: iter.text }) });
                const buItemValue = this.newPRFModalData.newPRFData.inputData.find((iter: any) => iter.title === 'tableHead.bu').value;
                if (buItemValue && buItemList.findIndex((iter: any) => iter.value === buItemValue) === -1) {
                    this.newPRFModalData.newPRFData.inputData.find((iter: any) => iter.title === 'tableHead.bu').value = '';
                }
            }
        }
        this.newPRFCheckCanSubmit();
    }

    saveEPData: any = {
        timer: null,
        saveSubscribe: null
    };

    newPRFInputEPDataChange(event: any, item: any) {
        if (event.flag) {
            clearTimeout(this.saveEPData.timer);
            if (this.saveEPData.saveSubscribe) {
                this.saveEPData.saveSubscribe.unsubscribe();
            }
            this.saveEPData.timer = setTimeout(() => {
                const key = item.title.split('.')[1];
                const value = key === 'split' && item.value === '' ? 0 : item.value;
                this.saveEPData.saveSubscribe = this.ipmApiService.editEP(
                    this.newPRFModalData.newPRFData.tableData[0].prfId,
                    Object.assign({ [key]: value })
                ).subscribe((resp: any) => {
                    // console.log(resp);
                    if (resp.status === 204) {
                        this.newPRFCheckCanSubmit();
                    } else {
                        this.utils.pagePrompt('error', 'notice.updateFail', '');
                    }
                })
            }, 500);
        }
        this.newPRFCheckCanSubmit();
    }

    newPRFTableDataRemove(j: number) {
        if (this.newPRFModalData.newPRFData.tableData.length > 1) {
            this.newPRFModalData.newPRFData.tableData.splice(j, 1);
            this.newPRFModalData.newPRFData.tableData = this.utils.deepClone(this.newPRFModalData.newPRFData.tableData);
        }
    }

    newPRFTableDataAdd() {
        this.newPRFModalData.newPRFData.tableData = Array.prototype.concat(
            ...this.newPRFModalData.newPRFData.tableData,
            this.utils.deepClone(this.oneNewPRFTableData)
        )
    }

    newPRFTableDataChange() {
        this.newPRFCheckCanSubmit();
    }

    newPRFCheckCanSubmit() {
        let inputDataCanSubmit = false;
        let inputEPDataCanSubmit = false;
        let tableDataCanSubmit = false;
        if (this.newPRFModalData.type === 'new' || this.newPRFModalData.type === 'edit') {
            inputDataCanSubmit = this.newPRFModalData.newPRFData.inputData.findIndex((item: any) => !item.status) === -1;
            tableDataCanSubmit = this.newPRFModalData.newPRFData.tableData.map((item: any) =>
                item.div.status &&
                item.janBudget.status && item.febBudget.status && item.marBudget.status && item.aprBudget.status &&
                item.mayBudget.status && item.junBudget.status && item.julBudget.status && item.augBudget.status &&
                item.sepBudget.status && item.octBudget.status && item.novBudget.status && item.decBudget.status
            ).findIndex((item: any) => !item) === -1;
            this.newPRFModalData.canSubmit = inputDataCanSubmit && tableDataCanSubmit;
        } else if (this.newPRFModalData.type === 'editEP') {
            inputEPDataCanSubmit = this.newPRFModalData.newPRFData.inputEPData.findIndex((item: any) => !item.status) === -1;
            this.newPRFModalData.canSubmit = inputEPDataCanSubmit;
        }
    }

    newPRFSubmit() {
        this.newPRFModalData.submitLoading = true;
        if (this.newPRFModalData.type === 'new' || this.newPRFModalData.type === 'edit') {
            const newPRFData: any = {
                "projectYear": String(this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.year').value.getFullYear()),
                "projectName": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.projectName').value,
                "itPm": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.itPm').value,
                "bizOwner": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.bizOwner').value,
                "contactWindow": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.contactWindow').value,
                "bo": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.bo').value,
                "bg": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.bg').value,
                "bu": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.bu').value,
                "customer": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.customer').value,
                "site": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.site').value,
                "planStartDate": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.planStart').value.toISOString(),
                "planFinishDate": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.planFinish').value.toISOString(),
                "recvEpCode": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.recvEpCode').value,
                "recvChargeDept": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.recvChargeDept').value,
                "projectCategory": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.projectCategory').value,
                "projectType": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.projectType').value,
                "misHandleDiv": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.misHandleDiv').value,
                "projectNameMerged": this.newPRFModalData.newPRFData.inputEPData.find((item: any) => item.title === 'tableHead.projectNameMerged').value,
                "misEpCode": this.newPRFModalData.newPRFData.inputEPData.find((item: any) => item.title === 'tableHead.misEpCode').value,
                "pmcsEpProjectNameMerged": this.newPRFModalData.newPRFData.inputEPData.find((item: any) => item.title === 'tableHead.pmcsEpProjectNameMerged').value,
                "split": Number(this.newPRFModalData.newPRFData.inputEPData.find((item: any) => item.title === 'tableHead.split').value),
                "comments": this.newPRFModalData.newPRFData.inputData.find((item: any) => item.title === 'tableHead.comments').value,
                "cancelled": false,
                "budgetSystemRecvChargeDept": this.newPRFModalData.newPRFData.otherData.budgetSystemRecvChargeDept,
                "prfLns": this.newPRFModalData.newPRFData.tableData.map((item: any) => {
                    return {
                        "prfId": item.prfId ? item.prfId : null,
                        "projectName": this.newPRFModalData.newPRFData.inputData.find((iter: any) => iter.title === 'tableHead.projectName').value,
                        "div": item.div.value,
                        "janBudget": !isNaN(Number(item.janBudget.value)) ? Number(item.janBudget.value) : null,
                        "febBudget": !isNaN(Number(item.febBudget.value)) ? Number(item.febBudget.value) : null,
                        "marBudget": !isNaN(Number(item.marBudget.value)) ? Number(item.marBudget.value) : null,
                        "aprBudget": !isNaN(Number(item.aprBudget.value)) ? Number(item.aprBudget.value) : null,
                        "mayBudget": !isNaN(Number(item.mayBudget.value)) ? Number(item.mayBudget.value) : null,
                        "junBudget": !isNaN(Number(item.junBudget.value)) ? Number(item.junBudget.value) : null,
                        "julBudget": !isNaN(Number(item.julBudget.value)) ? Number(item.julBudget.value) : null,
                        "augBudget": !isNaN(Number(item.augBudget.value)) ? Number(item.augBudget.value) : null,
                        "sepBudget": !isNaN(Number(item.sepBudget.value)) ? Number(item.sepBudget.value) : null,
                        "octBudget": !isNaN(Number(item.octBudget.value)) ? Number(item.octBudget.value) : null,
                        "novBudget": !isNaN(Number(item.novBudget.value)) ? Number(item.novBudget.value) : null,
                        "decBudget": !isNaN(Number(item.decBudget.value)) ? Number(item.decBudget.value) : null,
                    }
                })
            };
            this.newPRFModalData.submitLoading = true;
            if (this.newPRFModalData.type === 'new') {
                this.ipmApiService.addNewPRF(newPRFData).subscribe((resp: any) => {
                    this.newPRFModalData.submitLoading = false;
                    if (resp.msg === 'success') {
                        this.utils.pagePrompt('success', 'notice.newSuccess', '');
                        this.newPRFEnd();
                    } else if (resp.msg === 'exist') {
                        this.utils.pagePrompt('warning', 'notice.newDataExist', '');
                    } else {
                        this.utils.pagePrompt('error', 'notice.newFail', '');
                    }
                }, error => {
                    this.newPRFModalData.submitLoading = false;
                })
            } else if (this.newPRFModalData.type === 'edit') {
                this.ipmApiService.editPRF(newPRFData.prfLns[0].prfId, newPRFData).subscribe((resp: any) => {
                    this.newPRFModalData.submitLoading = false;
                    if (resp.msg === 'success') {
                        this.utils.pagePrompt('success', 'notice.updateSuccess', '');
                        this.newPRFEnd();
                    } else if (resp.msg === 'exist') {
                        this.utils.pagePrompt('warning', 'notice.newDataExist', '');
                    } else {
                        this.utils.pagePrompt('error', 'notice.updateFail', '');
                    }
                }, error => {
                    this.newPRFModalData.submitLoading = false;
                })
            }
        } else if (this.newPRFModalData.type === 'editEP') {
            this.ipmApiService.prfCopyToIB(this.newPRFModalData.newPRFData.tableData[0].prfId,).subscribe((resp: any) => {
                this.newPRFModalData.submitLoading = false;
                if (resp.msg === 'success') {
                    this.utils.pagePrompt('success', 'notice.operationSuccess', '');
                    this.newPRFEnd();
                } else {
                    this.utils.pagePrompt('error', 'notice.operationFail', '');
                }
            }, error => {
                this.newPRFModalData.submitLoading = false;
            })
        }
    }

    newPRFEnd() {
        this.newPRFModalData.onCancel();
        setTimeout(() => {
            this.newPRFModalData.newBudgetData = {
                inputData: [],
                tableData: []
            };
            // this.tableInfo.pageIndex = 1;
            // this.getTableData();
            if (this.newPRFModalData.type === 'new') {
                this.initPage();
            } else if (this.newPRFModalData.type === 'edit') {
                this.initPage(false);
            } else if (this.newPRFModalData.type === 'editEP') {
                this.getTableData();
            }
        }, 0);
    }

    newPRFModalCancelClick() {
        if (this.newPRFModalData.type === 'editEP') {
            this.newPRFModalData.onCancel();
            this.getTableData();
        } else {
            this.newPRFModalData.onCancel();
        }
    }

}
