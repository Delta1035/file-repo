import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
// import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(/**private auth: AuthService*/) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    // const authToken = this.auth.getAuthorizationToken();
    const authToken = 'token 123123';
    console.log('AuthInterceptor req', req);
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      map((res) => {
        console.log('AuthInterceptor res', res);
        return res
      })
    );
  }
}
