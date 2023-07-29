import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '@commonService/common.model';
import { ConfigLoaderService } from '@commonService/config/config-loader.service';
import { HttpData } from '@commonService/http.model';
export type RequestOption = {
  params: any;
  response: any;
  responseType: any;
  headers: any;
};
@Injectable()
export class HttpRequestService {
  constructor(
    private http: HttpClient,
    private readonly configLoader: ConfigLoaderService,
  ) {
  }


  private APP_CONFIG: AppConfig = this.configLoader.config<AppConfig>('config');
  baseUrl = `${this.APP_CONFIG.impBaseURL}/${this.APP_CONFIG.apiVersion}`;

  public async doRequest<T>(params: HttpData): Promise<T[]> {
    debugger;
    if (params['url'] == '' || params['url'] == undefined) {
      throw new Error('request url is missing');
    }
    if (params['method'] == 'post' || params['method'] == 'POST') {
      return await this.doPost(params);
    } else if (params['method'] == 'patch' || params['method'] == 'PATCH') {
      return await this.doPatch(params);
    } else if (params['method'] == 'get' || params['method'] == 'GET') {
      return await this.doGet(params);
    } else if (params['method'] == 'delete' || params['method'] == 'DELETE') {
      return await this.doDelete(params);
    } else if (params['method'] == 'put' || params['method'] == 'PUT') {
      return await this.doPut(params);
    }
    return new Promise<T[]>((res) => res);
  }

  public async doPost<T>(params: HttpData): Promise<T[]> {
    let url = this.baseUrl + params['url'];
    return await this.http.post<T[]>(url, params['data']).toPromise();
  }

  public async execPost<T>(params: HttpData): Promise<T> {
    let url = this.baseUrl + params['url'];
    return await this.http.post<T>(url, params['data'], {
      'headers':
        new HttpHeaders({
          Authorization: 'Token ' + (await localStorage.getItem('pmsToken')),
        })
    }).toPromise();
  }

  public async doPatch<T>(params: HttpData): Promise<T[]> {
    let url = this.baseUrl + params['url'];
    return await this.http.patch<T[]>(url, params['data']).toPromise();
  }

  public async doGet<T>(params: HttpData): Promise<T[]> {
    let url = this.baseUrl + params['url'];
    let requestOption: RequestOption = {
      params: undefined,
      response: undefined,
      responseType: undefined,
      headers: undefined,
    };
    if (params['data'] != undefined) {
      requestOption['params'] = new HttpParams({ fromObject: params['data'] });
    }
    if (params['response'] != undefined) {
      requestOption['responseType'] = params['response'];
    }
    requestOption['headers'] = new HttpHeaders({
      Authorization: 'Token ' + (await localStorage.getItem('pmsToken')),
    });
    return await this.http.get<T[]>(url, requestOption).toPromise();
  }

  public async execGet<T>(params: HttpData): Promise<HttpEvent<T>> {
    let url = this.baseUrl + params['url'];
    let requestOption = {} as any;
    if (params['data'] != undefined) {
      requestOption['params'] = new HttpParams({ fromObject: params['data'] });
    }
    if (params['response'] != undefined) {
      requestOption['responseType'] = params['response'];
    }
    requestOption['headers'] = new HttpHeaders({
      Authorization: 'Token ' + (await localStorage.getItem('pmsToken')),
    });
    return await this.http.get<T>(url, requestOption).toPromise();
  }

  public async doDelete<T>(params: HttpData): Promise<T[]> {
    let url = this.baseUrl + params['url'];
    let requestOption: RequestOption = {
      params: undefined,
      response: undefined,
      responseType: undefined,
      headers: undefined,
    };
    if (params['data'] != undefined) {
      requestOption['params'] = new HttpParams({ fromObject: params['data'] });
    }
    requestOption['headers'] = new HttpHeaders({
      Authorization: 'Token ' + (await localStorage.getItem('pmsToken')),
    });
    return await this.http.delete<T[]>(url, requestOption).toPromise();
  }

  public async doPut<T>(params: HttpData): Promise<T[]> {
    let url = this.baseUrl + params['url'];
    return await this.http.put<T[]>(url, params['data'], {
      'headers':
        new HttpHeaders({
          Authorization: 'Token ' + (await localStorage.getItem('pmsToken')),
        })
    }).toPromise();
  }

  public async execPut<T>(params: HttpData): Promise<T> {
    let url = this.baseUrl + params['url'];
    return await this.http.put<T>(url, params['data'],{
      'headers':
        new HttpHeaders({
          Authorization: 'Token ' + (await localStorage.getItem('pmsToken')),
        })
    }).toPromise();
  }
  public async Post<T>(params: HttpData): Promise<T[]> {
    let url = this.baseUrl + params['url'];
    return await this.http.post<T[]>(url, params['data']).toPromise();
  }
}
