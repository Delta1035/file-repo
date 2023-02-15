import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth.interceptor";
import { ErrorHandleService } from "./error-handle.interceptor";
import { ResponseInterceptor } from "./response.interceptor";


export const httpInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,// 多重提供者令牌
        useClass: AuthInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,// 多重提供者令牌
        useClass: ErrorHandleService,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,// 多重提供者令牌
        useClass: ResponseInterceptor,// 响应拦截器 放最后
        multi: true
    },
]