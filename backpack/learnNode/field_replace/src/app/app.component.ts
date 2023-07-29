import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { IpmApiService } from './services/ipm-api.service';
import { KeycloakService } from './services/keycloak.service';
import { PermissionsService } from './services/permissions.service';
import { ThemeService } from './services/theme.service';
import { UtilsService } from './utils/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'IPM-WEB';

  loginok: boolean = false;

  defaultLanguage = 'tw';

  constructor(
    public translate: TranslateService,
    public utils: UtilsService,
    private themeService: ThemeService,
    private keycloak: KeycloakService,
    public router: Router,
    public permissionsService: PermissionsService,
    private modal: NzModalService,
    private ipmApiService: IpmApiService,
  ) {
    this.initApp();
  }

  ngOnInit() {
    this.ipmApiService.getIPMApiUrl();
  }

  /**
   * @description: 初始化app（语言）
   * @return void
   */
  initApp(): void {
    this.initTheme();
    this.initLanguage();
    this.login();
  }

  initTheme() {
    this.themeService.loadTheme();
  }

  initLanguage() {
    const localStorageData = this.utils.getLocalStorage('home');
    const language = localStorageData && localStorageData.language ? localStorageData.language : this.defaultLanguage;
    if (language) {
      if (language === 'zh' || language === 'tw' || language === 'en') {
        this.translate.use(language);
      } else {
        this.translate.use(this.defaultLanguage);
      }
    }
  }

  login() {
    // this.loginok = true;
    this.keycloak.init().then(async (data: any) => {
      this.utils.setLocalStorage('userId', data.profile.preferred_username);
      this.utils.setLocalStorage('token', data.token);
      this.permissionsService.getUserPermissions().then(data => {
        if (this.permissionsService.userInfo.roleId === -1) {
          const modal: NzModalRef = this.modal.create({
            nzContent: this.translate.instant('app.noPermissionsNotice'),
            nzClassName: 'confirm_delete_modal',
            nzClosable: false,
            nzKeyboard: false,
            nzMaskClosable: false,
            nzCentered: true,
            nzFooter: [{
              label: this.translate.instant('button.exit'),
              onClick: () => new Promise<void>(resolve => {
                resolve();
                modal.destroy();
                this.keycloak.logout();
              })
            }, {
              label: this.translate.instant('button.confirm'),
              type: 'primary',
              onClick: () => new Promise<void>(resolve => {
                this.ipmApiService.addPersonInfo({
                  empno: this.permissionsService.userInfo.empno,
                  nameC: this.permissionsService.userInfo.nameC,
                  nameE: this.permissionsService.userInfo.nameE,
                  email: this.permissionsService.userInfo.email,
                  roleId: 1
                }).subscribe((resp: any) => {
                  if (resp.status === 200) {
                    this.ipmApiService.requestPermissions().subscribe((resp: any) => {
                      if (resp.status === 204 || resp.status === 200) {
                        resolve();
                        modal.destroy();
                        this.login();
                      }
                    })
                  }
                })
              })
            }]
          });
        } else if (this.permissionsService.userInfo.roleId === 1) {
          const modal: NzModalRef = this.modal.create({
            nzContent: this.translate.instant('app.permissionApplying'),
            nzClassName: 'confirm_delete_modal',
            nzClosable: false,
            nzKeyboard: false,
            nzMaskClosable: false,
            nzCentered: true,
            nzFooter: [{
              label: this.translate.instant('button.exit'),
              type: 'primary',
              onClick: () => new Promise<void>(resolve => {
                resolve();
                modal.destroy();
                this.keycloak.logout();
              })
            }]
          });
        } else {
          this.loginok = true;

        }
      });
    })
  }

}
