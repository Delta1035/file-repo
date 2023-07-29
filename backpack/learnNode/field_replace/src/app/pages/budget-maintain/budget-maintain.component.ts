import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BudgetExpandData, BudgetInfo } from '@commonDefine/budget.define';
import { Permission, TableHeaderInfo, TableInfo } from '@commonDefine/common.define';
import { IpmApiService } from '@commonService/ipm-api.service';
import { PermissionsService } from '@commonService/permissions.service';
import { UtilsService } from '@commonUtils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-budget-maintain',
    templateUrl: './budget-maintain.component.html',
    styleUrls: ['./budget-maintain.component.scss']
})
export class BudgetMaintainComponent implements OnInit {

    @ViewChild('dataTable', { static: true }) dataTable: ElementRef | undefined;

    pagePermission: Permission = this.permissionsService.getPagePermissions('budgetMaintain')

    searchKeyWord: string = '';

    searchYear: string = '';
    searchYearList: string[] = [];

    tableHeaderInfo: TableHeaderInfo[] = [
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
        { content: 'tableHead.planStart', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.planFinish', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.recvEpCode', align: 'center', left: false, right: false, width: 170 },
        { content: 'tableHead.recvChargeDept', align: 'center', left: false, right: false, width: 170 },
        { content: 'tableHead.projectCategory', align: 'center', left: false, right: false, width: 160 },
        { content: 'tableHead.projectType', align: 'center', left: false, right: false, width: 170 },
        { content: 'tableHead.misHandleDiv', align: 'center', left: false, right: false, width: 150 },
        { content: 'tableHead.cancelled', align: 'center', left: false, right: true, width: 120 },
        { content: 'tableHead.operation', align: 'center', left: false, right: true, width: 110 }
    ];

    tableInfo: TableInfo = {
        loading: false,
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 8,
        scrollX: 0,
        checkedAll: false
    }

    budgetData: BudgetInfo[] = [];

    newBudgetModalData: any = {
        title: '',
        width: 1600,
        className: 'new_budget_modal',
        type: '',
        show: false,
        newBudgetData: {},
        canSubmit: false,
        submitLoading: false,
        onShow: () => { this.newBudgetModalData.show = true },
        onCancel: () => { this.newBudgetModalData.show = false }
    }

    boList: any[] = [];

    resourcesList: any[] = [];
    projectCategoriesList: any[] = [];
    projectTypesList: any[] = [];
    recvChargeDeptList: any[] = [];
    misHandleDivList: any[] = [];

    oneNewBudgetTableData = {
        resource: {
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

    checkFlag: boolean = false;
    checkList: BudgetInfo[] = [];
    deleteFlag: boolean = false;
    copyToPRFFlag: boolean = false;

    uploadExcelModalData: any = {
        title: 'budgetMaintain.uploadBudget',
        width: 500,
        className: 'upload_excel_modal',
        type: 'upload', // upload  edit
        fileName: '',
        uploadFile: null,
        show: false,
        excelUploading: false,
        acceptFileType: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,
        uploadPreviewData: [],
        canSubmit: false,
        submitLoading: false,
        onShow: () => { this.uploadExcelModalData.show = true },
        onCancel: () => {
            this.uploadExcelModalData.show = false;
        }
    };

    uploadPreviewTableInfo = { x: 0, y: 0 };

    constructor(
        public title: Title,
        public translate: TranslateService,
        private ipmApiService: IpmApiService,
        public utils: UtilsService,
        private modal: NzModalService,
        public permissionsService: PermissionsService,
    ) {
        this.title.setTitle(this.translate.instant('home.budgetMaintain') + ' - ' + this.translate.instant('title'));
    }

    ngOnInit(): void {
        this.initPage();
    }

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
                this.resourcesList = resp.map((item: any) => {
                    return {
                        value: item.resource, text: item.resource
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
                this.recvChargeDeptList = resp.map((item: any) => {
                    return {
                        value: item.divCode, text: item.divCode
                    }
                })
                this.misHandleDivList = resp.map((item: any) => {
                    return {
                        value: item.name, text: item.divCode
                    }
                })
            })
            this.ipmApiService.getBudgetProjectYears().subscribe((resp: any) => {
                this.searchYearList = resp.map((item: any) => item.projectyear);
                if (flag) {
                    const currentYear = String(new Date().getFullYear());
                    this.searchYear = this.searchYearList.findIndex(item => item === currentYear) > -1 ? currentYear : '';
                }
                resolve();
            })
        });
        initPro.then(data => {
            this.tableInfo.scrollX = this.tableHeaderInfo.map(item => item.width).reduce((a, b) => a + b);
            this.uploadPreviewTableInfo.x = this.tableHeaderInfo.slice(0, -2).map(item => item.width).reduce((a, b) => a + b);
            this.uploadPreviewTableInfo.y = 600;
            this.tableInfo.pageSize = Math.floor((this.dataTable?.nativeElement.clientHeight - 64 - 48) / 50);
            this.getTableData();
        })
    }

    getTableData() {
        this.tableInfo.loading = true;
        const limit = this.tableInfo.pageSize;
        const skip = (this.tableInfo.pageIndex - 1) * this.tableInfo.pageSize;
        this.ipmApiService.getBudget({
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
                include: [{ relation: "budgetLns" }]
            })
        }).subscribe((resp: any) => {
            this.budgetData = resp.body.map((item: any) => {
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
                    comments: item.comments,
                    cancelled: item.cancelled,
                    prfStatus: item.status,
                    budgetSystemRecvChargeDept: item.budgetSystemRecvChargeDept,
                    expandData: item.budgetLns ? item.budgetLns.map((iter: any) => {
                        return {
                            resource: iter.resource,
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

    cancelBudget(item: BudgetInfo) {
        this.ipmApiService.editBudgetById(item.id, {
            cancelled: item.cancelled
        }).subscribe((resp: any) => {
            if (resp.status === 204) {
                this.utils.pagePrompt('success', 'notice.operationSuccess', '');
            } else {
                this.utils.pagePrompt('error', 'notice.operationFail', '');
            }
        })
    }

    newBugdetStart(type: string, data?: BudgetInfo) {
        this.newBudgetModalData.type = type;
        this.newBudgetModalData.title = type === 'edit' ? 'budgetMaintain.editBudget' : 'budgetMaintain.addNewBudget';
        this.newBudgetModalData.newBudgetData.inputData = [
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
            // { title: 'tableHead.itPm', value: '', must: true, status: false, type: 'number', range: [0, 100] },
            // { title: 'tableHead.itPm', value: '', must: true, status: false, type: 'select', list: [] },
            // { title: 'tableHead.itPm', value: '', must: true, status: false, type: 'date', range: [new Date('2022/7/2'), new Date('2022/7/22')] },
            // { title: 'tableHead.itPm', value: '', must: true, status: false, type: 'month', range: [] },
            // { title: 'tableHead.itPm', value: '', must: true, status: false, type: 'year', range: [] },
        ];
        this.oneNewBudgetTableData.resource.list = this.resourcesList;
        this.newBudgetModalData.newBudgetData.tableData = type === 'edit' ? data?.expandData.map((item: BudgetExpandData) => {
            const taregt = this.utils.deepClone(this.oneNewBudgetTableData);
            taregt.budgetId = data.id;
            taregt.resource.value = item.resource;
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
        }) : [this.utils.deepClone(this.oneNewBudgetTableData)];
        this.newBudgetModalData.newBudgetData.otherData = {
            budgetSystemRecvChargeDept: type === 'edit' ? data?.budgetSystemRecvChargeDept : 'no need'
        }
        this.newBudgetModalData.onShow();
    }

    newBudgetInputDataChange(item: any) {
        if (item.title === 'tableHead.bo') {
            const bgItemList = this.newBudgetModalData.newBudgetData.inputData.find((iter: any) => iter.title === 'tableHead.bg').list;
            const buItemList = this.newBudgetModalData.newBudgetData.inputData.find((iter: any) => iter.title === 'tableHead.bu').list;
            bgItemList.length = 0;
            buItemList.length = 0;
            const targetList = item.value ? this.boList.find(iter => iter.value === item.value).children : [];
            targetList.forEach((iter: any) => { bgItemList.push({ value: iter.value, text: iter.text }) });
            const bgItemValue = this.newBudgetModalData.newBudgetData.inputData.find((iter: any) => iter.title === 'tableHead.bg').value;
            if (bgItemValue && bgItemList.findIndex((iter: any) => iter.value === bgItemValue) === -1) {
                this.newBudgetModalData.newBudgetData.inputData.find((iter: any) => iter.title === 'tableHead.bg').value = '';
                this.newBudgetModalData.newBudgetData.inputData.find((iter: any) => iter.title === 'tableHead.bu').value = '';
            }
        } else if (item.title === 'tableHead.bg') {
            let boItemValue = this.newBudgetModalData.newBudgetData.inputData.find((iter: any) => iter.title === 'tableHead.bo').value;
            const buItemList = this.newBudgetModalData.newBudgetData.inputData.find((iter: any) => iter.title === 'tableHead.bu').list;
            buItemList.length = 0;
            const targetList = item.value ? this.boList.find(iter => iter.value === boItemValue).children.find((ele: any) => ele.value === item.value).children : [];
            targetList.forEach((iter: any) => { buItemList.push({ value: iter.value, text: iter.text }) });
            const buItemValue = this.newBudgetModalData.newBudgetData.inputData.find((iter: any) => iter.title === 'tableHead.bu').value;
            if (buItemValue && buItemList.findIndex((iter: any) => iter.value === buItemValue) === -1) {
                this.newBudgetModalData.newBudgetData.inputData.find((iter: any) => iter.title === 'tableHead.bu').value = '';
            }
        }
        this.newBudgetCheckCanSubmit();
    }

    newBudgetTableDataRemove(j: number) {
        if (this.newBudgetModalData.newBudgetData.tableData.length > 1) {
            this.newBudgetModalData.newBudgetData.tableData.splice(j, 1);
            this.newBudgetModalData.newBudgetData.tableData = this.utils.deepClone(this.newBudgetModalData.newBudgetData.tableData);
        }
    }

    newBudgetTableDataAdd() {
        this.newBudgetModalData.newBudgetData.tableData = Array.prototype.concat(
            ...this.newBudgetModalData.newBudgetData.tableData,
            this.utils.deepClone(this.oneNewBudgetTableData)
        )
    }

    newBudgetTableDataChange() {
        this.newBudgetCheckCanSubmit();
    }

    newBudgetCheckCanSubmit() {
        const inputDataCanSubmit = this.newBudgetModalData.newBudgetData.inputData.findIndex((item: any) => !item.status) === -1;
        const tableDataCanSubmit = this.newBudgetModalData.newBudgetData.tableData.map((item: any) =>
            item.resource.status &&
            item.janBudget.status && item.febBudget.status && item.marBudget.status && item.aprBudget.status &&
            item.mayBudget.status && item.junBudget.status && item.julBudget.status && item.augBudget.status &&
            item.sepBudget.status && item.octBudget.status && item.novBudget.status && item.decBudget.status
        ).findIndex((item: any) => !item) === -1;
        this.newBudgetModalData.canSubmit = inputDataCanSubmit && tableDataCanSubmit;
    }

    newBudgetSubmit() {
        const newBugdetData: any = {
            "projectYear": String(this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.year').value.getFullYear()),
            "projectName": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.projectName').value,
            "itPm": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.itPm').value,
            "bizOwner": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.bizOwner').value,
            "contactWindow": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.contactWindow').value,
            "bo": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.bo').value,
            "bg": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.bg').value,
            "bu": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.bu').value,
            "customer": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.customer').value,
            "site": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.site').value,
            "planStartDate": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.planStart').value.toISOString(),
            "planFinishDate": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.planFinish').value.toISOString(),
            "recvEpCode": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.recvEpCode').value,
            "recvChargeDept": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.recvChargeDept').value,
            "projectCategory": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.projectCategory').value,
            "projectType": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.projectType').value,
            "misHandleDiv": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.misHandleDiv').value,
            "comments": this.newBudgetModalData.newBudgetData.inputData.find((item: any) => item.title === 'tableHead.comments').value,
            "cancelled": false,
            "budgetSystemRecvChargeDept": this.newBudgetModalData.newBudgetData.otherData.budgetSystemRecvChargeDept,
            "budgetLns": this.newBudgetModalData.newBudgetData.tableData.map((item: any) => {
                return {
                    "budgetId": item.budgetId ? item.budgetId : null,
                    "projectName": this.newBudgetModalData.newBudgetData.inputData.find((iter: any) => iter.title === 'tableHead.projectName').value,
                    "resource": item.resource.value,
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
        this.newBudgetModalData.submitLoading = true;
        if (this.newBudgetModalData.type === 'new') {
            this.ipmApiService.addNewBudget(newBugdetData).subscribe((resp: any) => {
                this.newBudgetModalData.submitLoading = false;
                if (resp.msg === 'success') {
                    this.utils.pagePrompt('success', 'notice.newSuccess', '');
                    this.newBugdetEnd();
                } else if (resp.msg === 'exist') {
                    this.utils.pagePrompt('warning', 'notice.newDataExist', '');
                } else {
                    this.utils.pagePrompt('error', 'notice.newFail', '');
                }
            }, error => {
                this.newBudgetModalData.submitLoading = false;
            })
        } else if (this.newBudgetModalData.type === 'edit') {
            this.ipmApiService.editBudget(newBugdetData.budgetLns[0].budgetId, newBugdetData).subscribe((resp: any) => {
                this.newBudgetModalData.submitLoading = false;
                if (resp.msg === 'success') {
                    this.utils.pagePrompt('success', 'notice.updateSuccess', '');
                    this.newBugdetEnd();
                } else if (resp.msg === 'exist') {
                    this.utils.pagePrompt('warning', 'notice.newDataExist', '');
                } else {
                    this.utils.pagePrompt('error', 'notice.updateFail', '');
                }
            }, error => {
                this.newBudgetModalData.submitLoading = false;
            })
        }
    }

    newBugdetEnd() {
        this.newBudgetModalData.onCancel();
        setTimeout(() => {
            this.newBudgetModalData.newBudgetData = {
                inputData: [],
                tableData: []
            };
            // this.tableInfo.pageIndex = 1;
            // this.getTableData();
            if (this.newBudgetModalData.type === 'new') {
                this.initPage();
            } else if (this.newBudgetModalData.type === 'edit') {
                this.initPage(false);
            }
        }, 0);
    }

    checkedAll() {
        this.budgetData.forEach(item => {
            if (item.prfStatus === 0) {
                item.checked = this.tableInfo.checkedAll
            }
        });
    }

    checkedItem() {
        let flag = true;
        this.budgetData.forEach(item => {
            if (item.prfStatus === 0) {
                if (!item.checked) {
                    flag = false;
                }
            }
        })
        this.tableInfo.checkedAll = flag;
    }

    copyToPRFStart() {
        this.checkList = [];
        this.checkFlag = true;
        this.copyToPRFFlag = true;
        this.budgetData.forEach(item => {
            item.expand = false;
        })
    }

    cancelCopyToPRF() {
        this.checkList = [];
        this.checkFlag = false;
        this.copyToPRFFlag = false;
    }

    confirmCopyToPRF() {
        this.checkList = this.budgetData.filter(item => item.checked);
        if (this.checkList.length > 0) {
            this.copyToPRFReal();
        }
    }

    copyToPRFItem(item: BudgetInfo) {
        this.checkList = [item];
        this.copyToPRFReal();
    }

    copyToPRFReal() {
        const modal: NzModalRef = this.modal.create({
            nzContent: this.translate.instant('budgetMaintain.confirmCopyToPRFNotice', {
                budgetList: `<span class="font_weight_600 danger_color">${this.checkList.map(item => '<br >' + item.year + '-' + item.projectName).join('')}</span>`
            }),
            nzClassName: 'confirm_copy_to_prf_modal',
            nzClosable: false,
            nzCentered: true,
            nzFooter: [{
                label: this.translate.instant('button.cancel'),
                onClick: () => modal.destroy()
            }, {
                label: this.translate.instant('budgetMaintain.confirmCopyToPRF'),
                type: 'primary',
                onClick: () => new Promise<void>(resolve => {
                    this.ipmApiService.budgetCopyToPRF(this.checkList.map(item => item.id)).subscribe((resp: any) => {
                        resolve();
                        if (resp.msg === 'success') {
                            this.utils.pagePrompt('success', 'notice.operationSuccess', '');
                            this.getTableData();
                            modal.destroy();
                        } else {
                            this.utils.pagePrompt('error', 'notice.operationFail', '');
                            modal.destroy();
                        }
                    }, error => {
                        resolve();
                    });
                })
            }]
        });
    }

    deleteStart() {
        this.checkList = [];
        this.checkFlag = true;
        this.deleteFlag = true;
        this.budgetData.forEach(item => {
            item.expand = false;
        })
    }

    cancelDelete() {
        this.checkList = [];
        this.checkFlag = false;
        this.deleteFlag = false;
    }

    confirmDelete() {
        this.checkList = this.budgetData.filter(item => item.checked);
        if (this.checkList.length > 0) {
            this.deleteReal();
        }
    }

    deleteItem(item: BudgetInfo) {
        this.checkList = [item];
        this.deleteReal();
    }

    deleteReal() {
        const modal: NzModalRef = this.modal.create({
            nzContent: this.translate.instant('budgetMaintain.confirmDeleteBudget', {
                budgetList: `<span class="font_weight_600 danger_color">${this.checkList.map(item => '<br >' + item.year + '-' + item.projectName).join('')}</span>`
            }),
            nzClassName: 'confirm_delete_modal',
            nzClosable: false,
            nzCentered: true,
            nzFooter: [{
                label: this.translate.instant('button.cancel'),
                onClick: () => modal.destroy()
            }, {
                label: this.translate.instant('button.confirm'),
                type: 'primary',
                danger: true,
                onClick: () => new Promise<void>(resolve => {
                    this.ipmApiService.deleteBudget(this.checkList.map(item => item.id)).subscribe((resp: any) => {
                        resolve();
                        if (resp.status === 204) {
                            this.utils.pagePrompt('success', 'notice.deleteSuccess', '');
                            this.tableInfo.pageIndex = 1;
                            this.getTableData();
                            modal.destroy();
                        } else {
                            this.utils.pagePrompt('error', 'notice.deleteFail', '');
                            modal.destroy();
                        }
                    }, error => {
                        resolve();
                    });
                })
            }]
        });
    }

    downloadStart() {
        this.downloadReal();
    }

    downloadReal() {
        const modal: NzModalRef = this.modal.create({
            nzContent: this.translate.instant('budgetMaintain.confirmDownloadNotice'),
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
                    this.ipmApiService.downloadBudget({
                        filter: JSON.stringify({
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
                            include: [{ relation: "budgetLns" }]
                        })
                    }).subscribe((resp: any) => {
                        resolve();
                        if (resp.status === 200) {
                            const content: Blob = new Blob([resp.body], {
                                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
                            });
                            FileSaver.saveAs(content, 'Budget' + ' - ' + this.utils.getFormatDate(new Date(), 'yyyyMMdd'));
                            resolve();
                            modal.destroy();
                        } else {
                            resolve();
                            this.utils.pagePrompt('error', 'notice.downloadFail', '');
                        }
                    }, error => {
                        resolve();
                    });
                })
            }]
        });
    }

    uploadExcelStart() {
        this.uploadExcelModalData.onShow();
    }

    downloadBudgetExcelPublicFile() {
        this.ipmApiService.openFile('/files/project_upload_template.xlsx')
    }

    uploadClick() { }

    beforeUploadExcel = (file: NzUploadFile): boolean => {
        this.uploadExcelModalData.uploadFile = file;
        // if (uploadFile.size && uploadFile.size > 3 * 1024 * 1024) {
        //     //     // this.notification.warning(
        //     //     //     this.translate.instant('fileTooBig'),
        //     //     //     this.translate.instant('fileTooBig3MB')
        //     //     // );
        // } else {
        //     // this.handleUpload(uploadFile);
        // }
        this.uploadExcelModalData.fileName = file.name;
        return false;
    }

    handleUpload(): void {
        this.uploadExcelModalData.excelUploading = true;
        const fileReader: FileReader = new FileReader();
        fileReader.readAsBinaryString(this.uploadExcelModalData.uploadFile);
        fileReader.onload = (event: any) => {
            this.ipmApiService.uploadBudgetExcelForPreview({ string: event.currentTarget.result }).subscribe((resp: any) => {
                if (Array.isArray(resp)) {
                    resp.forEach((item: any) => {
                        item.expand = false;
                    })
                    this.uploadExcelModalData.uploadPreviewData = resp;
                    this.uploadExcelModalData.excelUploading = false;
                    this.uploadExcelModalData.width = 1600;
                    this.uploadExcelModalData.canSubmit = this.uploadExcelModalData.uploadPreviewData.filter((item: any) => item.error.length > 0).length === 0;
                    this.uploadExcelModalData.type = 'edit';
                } else {
                    this.uploadExcelModalData.excelUploading = false;
                    if (resp.msg === 'invaild projectYear') {
                        this.utils.pagePrompt('error', 'budgetMaintain.invaildProjectYear', 'budgetMaintain.pleaseSelectAgain');
                    } else if (resp.msg === 'invaild misHandleDiv') {
                        this.utils.pagePrompt('error', 'budgetMaintain.invaildMisHandleDiv', 'budgetMaintain.pleaseSelectAgain');
                    }
                }
            })
        };
    }

    uploadExcelCheckError(name: string, error: string[]) {
        return error.findIndex(item => item === name) > -1;
    }

    uploadExcelSubmit() {
        this.uploadExcelModalData.submitLoading = true;
        const excelDataClone = this.utils.deepClone(this.uploadExcelModalData.uploadPreviewData);
        excelDataClone.forEach((item: any) => {
            delete item.expand;
            delete item.error;
        });
        this.ipmApiService.uploadBudgetData(excelDataClone).subscribe((resp: any) => {
            this.uploadExcelModalData.submitLoading = false;
            if (resp.msg === 'success') {
                this.utils.pagePrompt('success', 'notice.newSuccess', '');
                this.uploadExcelEnd();
                this.initPage();
            } else {
                this.utils.pagePrompt('success', 'notice.newFail', '');
            }
        }, error => {
            this.uploadExcelModalData.submitLoading = false;
        });
    }

    uploadExcelEnd() {
        this.newBudgetModelReset();
        this.uploadExcelModalData.onCancel();
    }

    newBudgetModelReset() {
        this.uploadExcelModalData.uploadPreviewData = [];
        this.uploadExcelModalData.excelUploading = false;
        this.uploadExcelModalData.width = 500;
        this.uploadExcelModalData.canSubmit = false;
        this.uploadExcelModalData.fileName = '';
        this.uploadExcelModalData.uploadFile = null;
        this.uploadExcelModalData.type = 'upload';
    }

    uploadSelectFileAgain() {
        this.newBudgetModelReset();
    }
}
