import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UtilsService } from './utils/utils.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        public title: Title,
        public translate: TranslateService,
        public utils: UtilsService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                event => { },
                error => {
                    if (error instanceof HttpErrorResponse) {
                        console.error(error);
                        // 访问权限问题
                        if (error.status === 401 && error.url) {
                            this.utils.pagePrompt('error', 'apiError.loginExpired', '');
                        } else if (error.status === 404) {
                            this.utils.pagePrompt('error', 'apiError.notFound', error.url ? error.url : '');
                        } else if (error.status === 500) {
                            this.utils.pagePrompt('error', 'apiError.serviceError', '');
                        } else if (error.status === 504) {
                            this.utils.pagePrompt('error', 'apiError.timedOut', 'apiError.pleaseRefreshAndTryAgain');
                        } else if (error.status === 0) {
                            this.utils.pagePrompt('error', 'apiError.unknownErrorType', '');
                        } else {
                            this.defaultErrorNotification(error);
                        }
                    } else {
                        this.utils.pagePrompt('error', 'apiError.unknownErrorType', '');
                    }
                }
            )
        )
    }

    /**
     * @description: 默认的api错误提示信息，提示内容：url、响应状态码、错误名称、错误信息
     * @param error api返回的错误信息
     * @return void
     */
    defaultErrorNotification(error: any): void {
        this.utils.pagePrompt('error', 'apiError.dataAccessError', 'apiError.checkErrorInfo');
    }
}
