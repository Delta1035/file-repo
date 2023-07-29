import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserInfo } from '@commonDefine/common.define';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'src/app/services/keycloak.service';
import { PermissionsService } from 'src/app/services/permissions.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    localStorageData: any;

    language: string | undefined;

    routerII: string = '';

    userInfo: UserInfo = this.permissionsService.userInfo;

    siderCollapsed: boolean = false;

    budgetShow: boolean = false;
    budgetShowList: boolean[] = [];
    tssShow: boolean = false;
    tssShowList: boolean[] = [];
    mepShow: boolean = false;
    mepShowList: boolean[] = [];
    reportShow: boolean = false;
    reportShowList: boolean[] = [];
    basicDataShow: boolean = false;
    basicDataShowList: boolean[] = [];
    maintainShow: boolean = false;
    maintainShowList: boolean[] = [];

    constructor(
        public title: Title,
        public utils: UtilsService,
        public translate: TranslateService,
        private themeService: ThemeService,
        private keycloak: KeycloakService,
        private router: Router,
        public permissionsService: PermissionsService,
    ) {
        this.title.setTitle(this.translate.instant('title'));
    }

    ngOnInit(): void {
        this.pageInit();
    }

    /**
     * @description: 初始化当前页面中的数据
     * @return void
     */
    pageInit(): void {
        this.localStorageData = this.utils.getLocalStorage('home');
        this.language = this.localStorageData && this.localStorageData.language ? this.localStorageData.language : 'tw';
        this.routerII = window.location.pathname.split('/')[2];
        this.getPageShow();
    }

    getPageShow() {
        this.budgetShowList = [
            this.permissionsService.getPagePermissions('budgetMaintain').allowedRead,
            this.permissionsService.getPagePermissions('budgetPRF').allowedRead
        ];
        this.tssShowList = [
            this.permissionsService.getPagePermissions('tssMaintain').allowedRead,
            this.permissionsService.getPagePermissions('tssReport').allowedRead
        ];
        this.mepShowList = [
            this.permissionsService.getPagePermissions('mepSteps').allowedRead,
            this.permissionsService.getPagePermissions('mepPAJMaintainPAJChargeManMonth').allowedRead ||
            this.permissionsService.getPagePermissions('mepPAJTrackingReport').allowedRead,
            this.permissionsService.getPagePermissions('mepBUWiwynnPAJ').allowedRead,
            this.permissionsService.getPagePermissions('mepExternalNameMaintain').allowedRead
        ];
        this.reportShowList = [
            this.permissionsService.getPagePermissions('reportChecking').allowedRead
        ];
        this.basicDataShowList = [
            this.permissionsService.getPagePermissions('basicDataOrganization').allowedRead,
            this.permissionsService.getPagePermissions('basicDataTssCal').allowedRead,
            this.permissionsService.getPagePermissions('basicDataResourceGroup').allowedRead,
            this.permissionsService.getPagePermissions('basicDataDivDept').allowedRead
        ];
        this.maintainShowList = [
            this.permissionsService.getPagePermissions('maintainPerson').allowedRead,
            this.permissionsService.getPagePermissions('maintainRole').allowedRead
        ];
        this.budgetShow = this.budgetShowList.findIndex(item => item) > -1;
        this.tssShow = this.tssShowList.findIndex(item => item) > -1;
        this.mepShow = this.mepShowList.findIndex(item => item) > -1;
        this.reportShow = this.reportShowList.findIndex(item => item) > -1;
        this.basicDataShow = this.basicDataShowList.findIndex(item => item) > -1;
        this.maintainShow = this.maintainShowList.findIndex(item => item) > -1;
    }

    /**
     * @description: 设定当前页面的语言
     * @param language: string 目标语言
     * @return void
     */
    changeLanguage(language: string): void {
        this.translate.use(language);
        this.language = language;
        this.saveHomeLocalStorage();
    }

    /**
     * @description: 保存当前页面部分数据到本地存储
     * @return void
     */
    saveHomeLocalStorage(): void {
        this.utils.setLocalStorage('home', {
            language: this.language,
        });
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    logout() {
        this.utils.removeLocalStorage('token');
        this.keycloak.logout();
    }

}
