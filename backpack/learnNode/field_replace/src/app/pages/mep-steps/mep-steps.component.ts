import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Permission, Tab, TableInfo } from '@commonDefine/common.define';
import { UnkownName, UnkownProject } from '@commonDefine/mep-steps.define';
import { IpmApiService } from '@commonService/ipm-api.service';
import { PermissionsService } from '@commonService/permissions.service';
import { UtilsService } from '@commonUtils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
    selector: 'app-mep-steps',
    templateUrl: './mep-steps.component.html',
    styleUrls: ['./mep-steps.component.scss']
})
export class MepStepsComponent implements OnInit {

    @ViewChild('dataTable', { static: false }) dataTable: ElementRef | undefined;

    step: 'complete' | 'upload' | 'uploading' | 'uploaded' | 'maintain' | '' = '';
    stepNumber: number = 0;

    tssMonth: string = '';
    tssYear: string = '';

    steUploadingTimmer: any = null;
    steUploadingSubscribe: any = null;

    pagePermission: Permission = this.permissionsService.getPagePermissions('mepSteps');

    uploadExcelModalData: any = {
        title: 'mepSteps.uploadTSS',
        width: 500,
        className: 'upload_excel_modal',
        fileName: '',
        uploadFile: null,
        show: false,
        excelUploading: false,
        acceptFileType: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`,
        onShow: () => { this.uploadExcelModalData.show = true },
        onCancel: () => {
            this.uploadExcelModalData.show = false;
        }
    };

    tab: string = 'unkownName';
    tabList: Tab[] = [
        { tab: 'unkownName', tabName: 'mepSteps.unkownName', disabled: false },
        { tab: 'unkownProject', tabName: 'mepSteps.unkownProject', disabled: false }
    ];

    tableInfo: TableInfo = {
        loading: false,
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 8,
        checkedAll: false,
    };

    unkownNameData: UnkownName[] = [];
    unkownProjectData: UnkownProject[] = [];

    unknownTSSNameNewModalData: any = {
        title: 'basicDataResourceGroup.newInfo',
        width: 800,
        className: 'unknown_tss_name_new_modal',
        show: false,
        unknownTSSNameNewData: {},
        canSubmit: false,
        submitLoading: false,
        onShow: () => { this.unknownTSSNameNewModalData.show = true },
        onCancel: () => { this.unknownTSSNameNewModalData.show = false }
    }

    divList: any[] = [];

    completeStatus: any = {
        notice1: { show: false, loading: false, status: false },
        notice2: { show: false, loading: false, status: false },
        notice3: { show: false, loading: false, status: false },
        notice4: { show: false, loading: false, status: false }
    }

    constructor(
        public title: Title,
        public translate: TranslateService,
        private ipmApiService: IpmApiService,
        public utils: UtilsService,
        private modal: NzModalService,
        public permissionsService: PermissionsService,
    ) {
        this.title.setTitle(this.translate.instant('home.mepSteps') + ' - ' + this.translate.instant('title'));
    }

    ngOnInit(): void {
        this.initPage();
    }

    initPage() {
        const initPro = new Promise<void>((resolve, reject) => {
            clearInterval(this.steUploadingTimmer);
            this.ipmApiService.tssesException().subscribe((resp: any) => {
                this.step = resp.stage;
                this.tssMonth = resp.tssMonth;
                this.tssYear = resp.tssYear;
                // this.step = 'complete';
                // this.step = 'upload';
                // this.step = 'uploading';
                // this.step = 'uploaded';
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
                setTimeout(() => {
                    resolve();
                }, 0);
            })
        });
        initPro.then((data) => {
            if (this.step === 'uploaded') {
                this.ipmApiService.getDivs().subscribe((resp: any) => {
                    this.divList = resp.map((item: any) => {
                        return {
                            value: item.name, text: item.name
                        }
                    })
                });
                this.tableInfo.pageSize = Math.floor((this.dataTable?.nativeElement.clientHeight - 64 - 48) / 50);
                this.getTableData();
            } else if (this.step === 'uploading') {
                this.steUploadingTimmer = setInterval(() => {
                    if (this.steUploadingSubscribe) {
                        this.steUploadingSubscribe.unsubscribe();
                    }
                    this.steUploadingSubscribe = this.ipmApiService.tssesException().subscribe((resp: any) => {
                        if (resp.step !== 'uploading') {
                            this.initPage();
                        }
                    })
                }, 1000 * 10);
            }
        });
    }

    getTableData() {
        this.tableInfo.loading = true;
        const limit = this.tableInfo.pageSize;
        const skip = (this.tableInfo.pageIndex - 1) * this.tableInfo.pageSize;
        if (this.tab === 'unkownName') {
            this.ipmApiService.getUnknownTSSNames({
                // filter: JSON.stringify({ limit, skip, })
            }).subscribe((resp: any) => {
                this.unkownNameData = resp.body.map((item: any) => {
                    return {
                        id: item.id, pmcsIbProjectName: item.pmcsIbProjectName, misIbCode: item.misIbCode,
                        itPm: item.itPm, empName: item.empName, empId: item.empId, dept: item.dept,
                        projectYear: item.projectYear,
                        checked: false
                    }
                })
                this.tableInfo.pageTotal = Number(resp.headers.get('count'));
                this.tableInfo.loading = false;
            });
        } else if (this.tab === 'unkownProject') {
            this.ipmApiService.getUnknownTSSProjects({
                filter: JSON.stringify({ limit, skip, })
            }).subscribe((resp: any) => {
                this.unkownProjectData = resp.body.map((item: any) => {
                    return {
                        id: item.id, tssProjectName: item.tssProjectName,
                        misIbCode: item.tssIbCode, itPm: item.itPm,
                        checked: false
                    }
                })
                this.tableInfo.pageTotal = Number(resp.headers.get('count'));
                this.tableInfo.loading = false;
            });
        }
    }

    tablePageIndexChange() {
        if (this.tab === 'unkownProject') {
            this.getTableData();
        }
    }

    tabChange() {
        this.tableInfo.pageIndex = 1;
        this.getTableData();
    }

    mepStepsComplete() {
        const modal: NzModalRef = this.modal.create({
            nzContent: this.translate.instant('mepSteps.mepStepsCompleteNotice'),
            nzClassName: 'mep_steps_complete_modal',
            nzClosable: false,
            nzCentered: true,
            nzFooter: [{
                label: this.translate.instant('button.cancel'),
                onClick: () => modal.destroy()
            }, {
                label: this.translate.instant('button.confirm'),
                type: 'primary',
                onClick: () => new Promise<void>(resolve => {
                    this.completeStatusStart();
                    this.ipmApiService.mepStepsComplete().subscribe((resp: any) => {
                        resolve();
                        if (resp.msg === 'success') {
                            modal.destroy();
                            const time1 = this.utils.randomRange(3000, 4000);
                            const time2 = time1 + this.utils.randomRange(2000, 3000);
                            const time3 = time2 + 1000;
                            const time4 = time3 + 1000;
                            setTimeout(() => {
                                this.completeStatus.notice1 = { show: true, loading: false, status: true };
                            }, time1);
                            setTimeout(() => {
                                this.completeStatus.notice2 = { show: true, loading: false, status: true };
                            }, time2);
                            setTimeout(() => {
                                this.completeStatus.notice3 = { show: true, loading: false, status: true };
                            }, time3);
                            setTimeout(() => {
                                this.completeStatus.notice4 = { show: true, loading: false, status: true };
                                this.utils.pagePrompt('success', 'notice.operationSuccess', '');
                                this.initPage();
                            }, time4);
                        } else {
                            this.utils.pagePrompt('error', 'notice.operationFail', '');
                            this.completeStatusError();
                        }
                    }, error => {
                        resolve();
                        this.completeStatusError();
                    });
                })
            }]
        });
    }

    completeStatusStart() {
        this.completeStatus.notice1 = { show: true, loading: true, status: false };
        this.completeStatus.notice2 = { show: true, loading: true, status: false };
        this.completeStatus.notice3 = { show: true, loading: true, status: false };
        this.completeStatus.notice4 = { show: true, loading: true, status: false };
    }

    completeStatusError() {
        this.completeStatus.notice1 = { show: true, loading: false, status: false };
        this.completeStatus.notice2 = { show: true, loading: false, status: false };
        this.completeStatus.notice3 = { show: true, loading: false, status: false };
        this.completeStatus.notice4 = { show: true, loading: false, status: false };
    }

    completeStatusEnd() {
        this.completeStatus.notice1 = { show: false, loading: false, status: false };
        this.completeStatus.notice2 = { show: false, loading: false, status: false };
        this.completeStatus.notice3 = { show: false, loading: false, status: false };
        this.completeStatus.notice4 = { show: false, loading: false, status: false };
    }

    uploadExcelStart() {
        this.uploadExcelModalData.onShow();
    }

    downloadExcelPublicFile() {
        this.ipmApiService.openFile('/files/tss_upload_template.xlsx');
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
        const fd = new FormData();
        fd.append('file', this.uploadExcelModalData.uploadFile);
        this.ipmApiService.uploadTSS(fd).subscribe((resp: any) => {
            this.uploadExcelModalData.excelUploading = false;
            if (resp.msg === 'success') {
                this.utils.pagePrompt('success', 'notice.operationSuccess', '');
                this.uploadExcelModalData.onCancel();
                this.initPage();
            } else {
                this.utils.pagePrompt('error', 'notice.operationFail', '');
            }
        }, error => {
            this.uploadExcelModalData.excelUploading = false;
        })
    }

    unknownTSSNameNewStart(data: UnkownName) {
        this.unknownTSSNameNewModalData.unknownTSSNameNewData = {
            empName: data.empName, div: '',
            projectYear: data.projectYear,
            misIbCode: data.misIbCode
        };
        this.unknownTSSNameNewModalData.onShow();
    }

    unknownTSSNameNewNameChange() {
        this.unknownTSSNameNewCheckCanSubmit();
    }

    unknownTSSNameNewDivChange() {
        this.unknownTSSNameNewCheckCanSubmit();
    }

    unknownTSSNameNewCheckCanSubmit() {
        this.unknownTSSNameNewModalData.canSubmit = this.unknownTSSNameNewModalData.unknownTSSNameNewData.empName &&
            this.unknownTSSNameNewModalData.unknownTSSNameNewData.div;
    }

    unknownTSSNameNewSubmit() {
        this.unknownTSSNameNewModalData.submitLoading = true;
        this.ipmApiService.unknownTSSNameNew([{
            empName: this.unknownTSSNameNewModalData.unknownTSSNameNewData.empName,
            year: String(new Date().getFullYear()),
            div: this.unknownTSSNameNewModalData.unknownTSSNameNewData.div,
        }]).subscribe((resp: any) => {
            this.unknownTSSNameNewModalData.submitLoading = false;
            if (resp === null || resp.msg === 'success') {
                this.utils.pagePrompt('success', 'notice.newSuccess', '');
                this.unknownTSSNameNewEnd();
            } else if (resp.msg === 'exist') {
                this.utils.pagePrompt('warning', 'notice.newDataExist', '');
            } else {
                this.utils.pagePrompt('error', 'notice.newFail', '');
            }
        }, error => {
            this.unknownTSSNameNewModalData.submitLoading = false;
        })
    }

    unknownTSSNameNewEnd() {
        this.unknownTSSNameNewModalData.onCancel();
        setTimeout(() => {
            const empName = this.unknownTSSNameNewModalData.unknownTSSNameNewData.empName;
            const projectYear = this.unknownTSSNameNewModalData.unknownTSSNameNewData.projectYear;
            const misIbCode = this.unknownTSSNameNewModalData.unknownTSSNameNewData.misIbCode;
            const index = this.unkownNameData.findIndex(item => empName === item.empName && projectYear === item.projectYear && misIbCode === item.misIbCode);
            this.unkownNameData.splice(index, 1);
            this.unkownNameData = this.utils.deepClone(this.unkownNameData);
            this.unknownTSSNameNewModalData.unknownTSSNameNewData = {};
        }, 0);
    }

    ngOnDestroy() {
        if (this.steUploadingTimmer) {
            clearInterval(this.steUploadingTimmer);
        }
        this.steUploadingSubscribe?.unsubscribe();
    }

    gotoMaintainLoading: boolean = false;

    gotoMaintain() {
        this.gotoMaintainLoading = true;
        this.ipmApiService.gotoMaintain().subscribe((resp: any) => {
            this.gotoMaintainLoading = false;
            if (resp.status === 204 || resp.status === 200) {
                this.utils.pagePrompt('success', 'notice.operationSuccess', '');
                this.initPage();
            } else {
                this.utils.pagePrompt('error', 'notice.operationFail', '');
            }
        }, error => {
            this.gotoMaintainLoading = false;
        })
    }

}
