/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { User } from '../models/user';
import { UserInfoResponse } from '../models/user-info-response';

@Injectable({
  providedIn: 'root',
})
export class UserControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation userControllerGetUserInfo
   */
  static readonly UserControllerGetUserInfoPath = '/info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserInfo$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserInfoResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.UserControllerGetUserInfoPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserInfoResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUserInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserInfo(params?: {
    context?: HttpContext
  }
): Observable<UserInfoResponse> {

    return this.getUserInfo$Response(params).pipe(
      map((r: StrictHttpResponse<UserInfoResponse>) => r.body as UserInfoResponse)
    );
  }

  /**
   * Path part for operation userControllerLogin
   */
  static readonly UserControllerLoginPath = '/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method doesn't expect any request body.
   */
  login$Response(params: {
    username: string;
    password: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.UserControllerLoginPath, 'post');
    if (params) {
      rb.query('username', params.username, {});
      rb.query('password', params.password, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  login(params: {
    username: string;
    password: string;
    context?: HttpContext
  }
): Observable<User> {

    return this.login$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

}
