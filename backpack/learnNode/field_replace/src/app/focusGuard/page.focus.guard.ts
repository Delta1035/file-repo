/*
 * @Autor: Chauncey Yuan
 * @Date: 2021-12-01 14:46:22
 * @LastEditors: Chauncey Yuan
 * @LastEditTime: 2022-01-12 10:01:27
 * @Description: This is a description about this file!
 * @FilePath: \smartspm_web\src\app\pages\home\home.focus.guard.ts
 */
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Resolve,
    Router,
    ActivatedRoute
} from '@angular/router';
import { PermissionsService } from '@commonService/permissions.service';
import { TranslateService } from '@ngx-translate/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PageFocusGuard implements CanActivate {
    constructor(
        public router: Router,
        public permissionsService: PermissionsService,
        public translate: TranslateService,
        public modal: NzModalService,
    ) { }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (!this.permissionsService.userInfo.roleId) {
            await this.permissionsService.getUserPermissions();
        }
        // 当前完整路由
        // console.log(state.url);
        const stateurl = state.url.split('#')[0]
        // 一级路由
        const router1 = stateurl.split('/')[1];
        // 二级路由
        const router2 = stateurl.split('/')[2];
        // 三级路由
        const router3 = stateurl.split('/')[3];

        // console.log(router1, router2, router3);

        if (router1 && router2 && router3) {
            if (router3 === 'mepPAJMaintain') {
                if (this.permissionsService.getPageShowPermission(['mepPAJMaintainPAJChargeManMonth', 'mepPAJTrackingReport'])) {
                    return true;
                } else {
                    this.router.navigate([`/home`, 'index']);
                    return false;
                }
            } else {
                if (this.permissionsService.getPagePermissions(router3).allowedRead) {
                    return true;
                } else {
                    this.router.navigate([`/home`, 'index']);
                    return false;
                }
            }
        } else {
            return true;
        }
    }

}

export class PageResolveModule implements Resolve<any> {
    constructor() { }
    resolve() { }
}
