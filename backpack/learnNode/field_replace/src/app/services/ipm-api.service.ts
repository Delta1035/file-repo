import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  basicData,
  Division,
  ErrorStatus,
  Extrtna,
  ResourceGroup,
  TssCal,
  Years,
} from '@commonDefine/index';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { ipmApiUrl } from '../../environments/environment';
import { serviceUrls } from './ipm-api.service.config';

// let ipmApiUrl = '';

@Injectable({
  providedIn: 'root',
})
export class IpmApiService {
  ipmApiUrl: string = '';

  constructor(public http: HttpClient) { }

  getIPMApiUrl() {
    this.http.get('assets/environment.json').subscribe((resp: any) => {
      this.ipmApiUrl = resp.url;
    });
  }

  /**
   * @description: 获取api的option，主要是获取当前token
   * @return any 访问api要使用的option
   */
  getHttpOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  /**
   * @description: 错误捕捉返回
   * @param operation 请求的方法名字
   * @param result any 返回一个错误信息
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed:${error.message}`);
      return of(result as T);
    };
  }

  /**
   * @description: 獲取當前登錄用戶的相關信息
   */
  getUserInfo() {
    return this.http.get(this.ipmApiUrl + serviceUrls.getUserInfo, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 给系统管理员发送权限申请
   */
  requestPermissions() {
    return this.http.get(this.ipmApiUrl + serviceUrls.requestPermissions, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
    });
  }

  // ---------------------maintain api--------
  // ---------------------maintain api--------
  // ---------------------maintain api--------
  // ---------------------maintain api--------
  // ---------------------maintain api--------
  // ---------------------maintain api--------

  /**
   * @description: 获取角色清單
   */
  getRoles() {
    return this.http.get(this.ipmApiUrl + serviceUrls.getRoles, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 获取所有頁面
   */
  getPages() {
    return this.http.get(this.ipmApiUrl + serviceUrls.getPages, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 獲取某個角色的權限
   */
  getRolePages(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getRolePages, {
      headers: this.getHttpOptions().headers,
      params,
    });
  }

  /**
   * @description: 新增角色
   */
  newRole(body: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.newRole, body, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
    });
  }

  /**
   * @description: 删除角色
   */
  deleteRole(roleId: string | number) {
    return this.http.delete(this.ipmApiUrl + serviceUrls.deleteRole + roleId, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
    });
  }

  /**
   * @description: 删除角色
   */
  editRole(roleId: string | number, body: any) {
    return this.http.patch(
      this.ipmApiUrl + serviceUrls.editRole + roleId + '/updateRolePages',
      body,
      {
        headers: this.getHttpOptions().headers,
        observe: 'response',
      }
    );
  }

  /**
   * @description: 获取用户
   */
  getPersonInfo(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getPersonInfo, {
      headers: this.getHttpOptions().headers,
      params,
      observe: 'response',
    });
  }

  /**
   * @description: 新增用户
   */
  addPersonInfo(body: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.addPersonInfo, body, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
    });
  }

  /**
   * @description: 编辑用户
   */
  editPersonInfo(roleId: string | number, body: any) {
    return this.http.patch(
      this.ipmApiUrl + serviceUrls.editPersonInfo + roleId,
      body,
      {
        headers: this.getHttpOptions().headers,
        observe: 'response',
      }
    );
  }

  /**
   * @description: 删除用户
   */
  deletePersonInfo(body: any) {
    return this.http.delete(this.ipmApiUrl + serviceUrls.deletePersonInfo, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
      body,
    });
  }

  // ---------------------budget api--------
  // ---------------------budget api--------
  // ---------------------budget api--------
  // ---------------------budget api--------
  // ---------------------budget api--------
  // ---------------------budget api--------
  // ---------------------budget api--------

  /**
   * @description: 获取budget数据
   */
  getBudget(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getBudget, {
      headers: this.getHttpOptions().headers,
      params,
      observe: 'response',
    });
  }

  /**
   * @description: 获取resources数据
   */
  getResources(params?: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getResources, {
      headers: this.getHttpOptions().headers,
      params,
    });
  }

  /**
   * @description: 获取Projectcategories数据
   */
  getProjectCategories(params?: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getProjectCategories, {
      headers: this.getHttpOptions().headers,
      params,
    });
  }

  /**
   * @description: 获取ProjectTypes数据
   */
  getProjectTypes(params?: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getProjectTypes, {
      headers: this.getHttpOptions().headers,
      params,
    });
  }

  /**
   * @description: 新增budget
   */
  addNewBudget(body: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.addNewBudget, body, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 删除budget数据
   */
  deleteBudget(body: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.deleteBudget, body, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
    });
  }

  /**
   * @description: 修改budget数据
   */
  editBudget(budgetId: string | number, body: any) {
    return this.http.patch(this.ipmApiUrl + serviceUrls.editBudget + budgetId, body, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 修改budget数据by id
   */
  editBudgetById(budgetId: string | number, body: any) {
    return this.http.patch(this.ipmApiUrl + serviceUrls.editBudgetById + budgetId, body, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
    });
  }

  /**
   * @description: 上傳budget excel供預覽
   */
  uploadBudgetExcelForPreview(body: any) {
    return this.http.post(
      this.ipmApiUrl + serviceUrls.uploadBudgetExcelForPreview,
      body,
      {
        headers: this.getHttpOptions().headers,
      }
    );
  }

  /**
   * @description: 上傳budget excel
   */
  uploadBudgetData(body: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.uploadBudgetData, body, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: Budget Copy To PRF
   */
  budgetCopyToPRF(body: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.budgetCopyToPRF, body, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 獲取budget數據中的所有年份
   */
  getBudgetProjectYears() {
    return this.http.get(this.ipmApiUrl + serviceUrls.getBudgetProjectYears, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 下载budget数据
   */
  downloadBudget(body: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.downloadBudget, body, {
      headers: this.getHttpOptions().headers,
      responseType: 'arraybuffer',
      observe: 'response'
    });
  }

  // ---------------------PRF api--------
  // ---------------------PRF api--------
  // ---------------------PRF api--------
  // ---------------------PRF api--------
  // ---------------------PRF api--------
  // ---------------------PRF api--------
  // ---------------------PRF api--------

  /**
   * @description: 获取budget数据
   */
  getPRF(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getPRF, {
      headers: this.getHttpOptions().headers,
      params,
      observe: 'response',
    });
  }

  /**
   * @description: 新增budget
   */
  addNewPRF(body: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.addNewPRF, body, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 修改budget数据
   */
  editPRF(prfId: string | number, body: any) {
    return this.http.patch(this.ipmApiUrl + serviceUrls.editPRF + prfId, body, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 獲取prf數據中的所有年份
   */
  getPRFProjectYears() {
    return this.http.get(this.ipmApiUrl + serviceUrls.getPRFProjectYears, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 編輯prf - EP
   */
  editEP(prfId: string | number, body: any) {
    return this.http.patch(this.ipmApiUrl + serviceUrls.editEP + prfId, body, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
    });
  }

  /**
   * @description: PRF Copy To IB
   */
  prfCopyToIB(prfID: number) {
    return this.http.post(this.ipmApiUrl + serviceUrls.prfCopyToIB, prfID, {
      headers: this.getHttpOptions().headers,
    });
  }

  // ---------------------ib api--------
  // ---------------------ib api--------
  // ---------------------ib api--------
  // ---------------------ib api--------
  // ---------------------ib api--------
  // ---------------------ib api--------
  // ---------------------ib api--------

  /**
   * @description: 获取ib数据
   */
  getIB(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getIB, {
      headers: this.getHttpOptions().headers,
      params,
      observe: 'response',
    });
  }

  /**
   * @description: 獲取ib數據中的所有年份
   */
  getIBProjectYears() {
    return this.http.get(this.ipmApiUrl + serviceUrls.getIBProjectYears, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 编辑IB-IB INFO
   */
  editIB(ibId: string | number, body: any) {
    return this.http.patch(this.ipmApiUrl + serviceUrls.editIB + ibId, body, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
    });
  }

  // ----------------------mep steps url -------
  // ----------------------mep steps url -------
  // ----------------------mep steps url -------
  // ----------------------mep steps url -------
  // ----------------------mep steps url -------
  // ----------------------mep steps url -------
  // ----------------------mep steps url -------
  /**
   * @description: 獲取當前階段
   */
  tssesException() {
    return this.http.get(this.ipmApiUrl + serviceUrls.tssesException, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: mepStepsComplete
   */
  mepStepsComplete() {
    return this.http.post(this.ipmApiUrl + serviceUrls.mepStepsComplete, null, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: uploadTSS excel
   */
  uploadTSS(formData: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.uploadTSS, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      })
    });
  }

  /**
   * @description: Unknown TSS Names
   */
  getUnknownTSSNames(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getUnknownTSSNames, {
      headers: this.getHttpOptions().headers,
      params,
      observe: 'response',
    });
  }

  /**
   * @description: Unknown TSS Projects
   */
  getUnknownTSSProjects(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getUnknownTSSProjects, {
      headers: this.getHttpOptions().headers,
      params,
      observe: 'response',
    });
  }

  /**
   * @description: 新增Unknown TSS Name
   */
  unknownTSSNameNew(params: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.createExtrtna, params, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: gotoMaintain
   */
  gotoMaintain() {
    return this.http.post(this.ipmApiUrl + serviceUrls.gotoMaintain, null, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
    });
  }

  /**
   * @description: gotoMaintain
   */
  gotoComplete() {
    return this.http.post(this.ipmApiUrl + serviceUrls.gotoComplete, null, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
    });
  }

  // ----------------------mep paj maintain url -------
  // ----------------------mep paj maintain url -------
  // ----------------------mep paj maintain url -------
  // ----------------------mep paj maintain url -------
  // ----------------------mep paj maintain url -------
  // ----------------------mep paj maintain url -------
  /**
   * @description: 獲取PAJChargeData
   */
  getPAJChargeData(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getPAJChargeData, {
      headers: this.getHttpOptions().headers,
      params,
      observe: 'response',
    });
  }

  /**
   * @description: 獲取trackingReportData
   */
  getTrackingReportData(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getTrackingReportData, {
      headers: this.getHttpOptions().headers,
      params,
      observe: 'response',
    });
  }

  /**
   * @description: 编辑保存To Charge PAJ Man-Months
   */
  editChargeToChargePAJData(pajId: string | number, body: any) {
    return this.http.patch(this.ipmApiUrl + serviceUrls.editChargeToChargePAJData + pajId, body, {
      headers: this.getHttpOptions().headers,
      observe: 'response',
    });
  }


  // ----------------------mep BU Wiwynn PAJ url -------
  // ----------------------mep BU Wiwynn PAJ url -------
  // ----------------------mep BU Wiwynn PAJ url -------
  // ----------------------mep BU Wiwynn PAJ url -------
  // ----------------------mep BU Wiwynn PAJ url -------
  // ----------------------mep BU Wiwynn PAJ url -------
  // ----------------------mep BU Wiwynn PAJ url -------
  // ----------------------mep BU Wiwynn PAJ url -------
  /**
   * @description: 获取bu paj 年份
   */
  getBUPAJYear() {
    return this.http.get(this.ipmApiUrl + serviceUrls.getBUPAJYear, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 获取wiwynn paj 年份
   */
  getWiwynnPAJYear() {
    return this.http.get(this.ipmApiUrl + serviceUrls.getWiwynnPAJYear, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 获取bu paj数据
   */
  getBUPAJ(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getBUPAJ, {
      headers: this.getHttpOptions().headers,
      params,
      observe: 'response',
    });
  }

  /**
   * @description: 获取wiwynn paj数据
   */
  getWiwynnPAJ(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.getWiwynnPAJ, {
      headers: this.getHttpOptions().headers,
      params,
      observe: 'response',
    });
  }

  /**
   * @description: 下載bu paj数据
   */
  downloadBU(body: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.downloadBU, body, {
      headers: this.getHttpOptions().headers,
      responseType: 'arraybuffer',
      observe: 'response'
    });
  }

  /**
   * @description: 下載wiwynn paj数据
   */
  downloadWiwynn(body: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.downloadWiwynn, body, {
      headers: this.getHttpOptions().headers,
      responseType: 'arraybuffer',
      observe: 'response'
    });
  }



  // -------------------basic data api--------
  // -------------------basic data api--------
  // -------------------basic data api--------
  // -------------------basic data api--------
  // -------------------basic data api--------
  // -------------------basic data api--------

  /**
   * @description: 获取bo/bg/bu清單
   */
  getBasicData<T>(params: any): Observable<T[]> {
    return this.http
      .get<T[]>(this.ipmApiUrl + serviceUrls['getBo'], {
        headers: this.getHttpOptions().headers,
        params,
      })
      .pipe(catchError(() => of([])));
  }

  /**
   * @description: 新增企業數據
   */
  addBasicData(
    params: basicData[]
  ): Observable<HttpResponseBase | ErrorStatus> {
    return this.http
      .post(this.ipmApiUrl + serviceUrls.addData, params, {
        headers: this.getHttpOptions().headers,
        observe: 'response',
      })
      .pipe(
        catchError(
          this.handleError<HttpResponseBase | ErrorStatus>('delBuData', {
            status: 401,
          })
        )
      );
  }

  /**
   * @description: 删除BU资料
   * @params bu的id
   */
  delBuData(id: number): Observable<HttpResponseBase | ErrorStatus> {
    return this.http
      .delete(this.ipmApiUrl + serviceUrls.getBu + '/' + id, {
        headers: this.getHttpOptions().headers,
        observe: 'response',
      })
      .pipe(
        catchError(
          this.handleError<HttpResponseBase | ErrorStatus>('delBuData', {
            status: 401,
          })
        )
      );
  }

  /**
   * @description: 模糊查询资料
   * @keyWord 查询的BO/BG/BU关键字
   */
  fuzzyEnterprise<T>(keyWord: string): Observable<T[]> {
    return this.http.post<T[]>(
      this.ipmApiUrl + serviceUrls.searchData + '?query' + '=' + keyWord,
      {
        headers: this.getHttpOptions().headers,
      }
    );
  }

  /**
   * -----------TSS-CAL---------------
   */
  /**
   * @description 获取所有年份清单
   * @return Observale<Years>
   */
  getYears() {
    const { cals, getYear } = serviceUrls;
    return this.http
      .get<Years[]>(this.ipmApiUrl + cals + '/' + getYear, {
        headers: this.getHttpOptions().headers,
      })
      .pipe(catchError(() => of([])));
  }

  /**
   * @description: 獲取TSS-CAL資料
   */
  getTssCalList(params: any) {
    return new Promise<HttpResponse<TssCal[]>>((resolve) => {
      this.http
        .get<TssCal[]>(this.ipmApiUrl + serviceUrls.cals, {
          headers: this.getHttpOptions().headers,
          params,
          observe: 'response',
        })
        .pipe(catchError(() => of([])))
        .subscribe((data) => resolve(data as HttpResponse<TssCal[]>));
    });
  }

  /**
   * @description: 獲取TSS-CAL資料
   * @id 需要更新的cal id
   * @day 更新cal的天数
   * @return Promise<any>
   */
  updateTssCalById(id: number, day: number) {
    return new Promise<any>((resolve) => {
      this.http
        .patch<HttpResponse<HttpResponseBase>>(
          this.ipmApiUrl + serviceUrls.cals + '/' + id,
          { day },
          {
            headers: this.getHttpOptions().headers,
            observe: 'response',
          }
        )
        .pipe(catchError(() => of([])))
        .subscribe((data) => resolve(data));
    });
  }

  /**
   * @description: 新增TSS-CAL資料
   * @params
   * @return
   */
  createTssCal(params: any) {
    return new Promise<any>((resolve) => {
      this.http
        .post<HttpResponse<HttpResponseBase>>(
          this.ipmApiUrl + serviceUrls.createCals,
          params,
          {
            headers: this.getHttpOptions().headers,
            observe: 'response',
          }
        )
        .pipe(catchError(() => of([])))
        .subscribe((data) => resolve(data));
    });
  }

  // ----------外部人員管理-------------
  /**
   * @description: 獲取外部人员資料
   */
  getExtrtnaList(params: any) {
    return new Promise<HttpResponse<Extrtna[]>>((resolve) => {
      this.http
        .get<Extrtna[]>(this.ipmApiUrl + serviceUrls.extrtna, {
          headers: this.getHttpOptions().headers,
          observe: 'response',
          params,
        })
        .pipe(catchError(() => of([])))
        .subscribe((data) => resolve(data as HttpResponse<Extrtna[]>));
    });
  }

  /**
   * @description: 刪除單個外部人員
   * @id 外部人員名單id
   * @return Observable<HttpResponseBase | ErrorStatus>
   */
  delEtrtnaById(id: number): Observable<HttpResponseBase | ErrorStatus> {
    return this.http
      .delete(this.ipmApiUrl + serviceUrls.extrtna + '/' + id, {
        headers: this.getHttpOptions().headers,
        observe: 'response',
      })
      .pipe(
        catchError(
          this.handleError<HttpResponseBase | ErrorStatus>('delEtrtnaById', {
            status: 401,
          })
        )
      );
  }

  /**
   * @description: 新增外部人员資料
   */
  createExtrtna(params: any): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<HttpResponseBase>>(
      this.ipmApiUrl + serviceUrls.createExtrtna,
      params,
      {
        headers: this.getHttpOptions().headers,
        observe: 'response',
      }
    );
  }


  // ------------Div-Dept--------------------
  // ------------Div-Dept--------------------
  // ------------Div-Dept--------------------
  // ------------Div-Dept--------------------
  // ------------Div-Dept--------------------
  // ------------Div-Dept--------------------
  /**
   * @description: 获取全部Div
   */
  getDivs(params?: any) {
    return this.http.get<Division[]>(this.ipmApiUrl + serviceUrls.divs, {
      headers: this.getHttpOptions().headers,
      params,
    });
  }

  /**
   * @description: 获取全部Div
   */
  getDivDept(params: any) {
    return this.http.get(this.ipmApiUrl + serviceUrls.divs, {
      headers: this.getHttpOptions().headers,
      params,
      observe: 'response',
    });
  }

  /**
   * @description: 创建div
   */
  addNewDiv(body: any) {
    return this.http.post(this.ipmApiUrl + serviceUrls.addNewDiv, body, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 修改Div数据
   */
  editDiv(divId: string | number, body: any) {
    return this.http.patch(this.ipmApiUrl + serviceUrls.editDiv + divId, body, {
      headers: this.getHttpOptions().headers,
    });
  }

  /**
   * @description: 删除Div数据
   */
  deleteDiv(divId: any[]) {
    return this.http.delete(this.ipmApiUrl + serviceUrls.deleteDiv, {
      headers: this.getHttpOptions().headers,
      body: divId,
      observe: 'response',
    });
  }

  // -------------ResourceGroup----------
  /**
   * @description 获取ResourceGroup清单
   * @return Promise<ResouceGroup[]>
   */
  getResource(params?: any) {
    return new Promise<HttpResponse<ResourceGroup[]>>((resolve) => {
      this.http
        .get<ResourceGroup[]>(this.ipmApiUrl + serviceUrls.resource, {
          headers: this.getHttpOptions().headers,
          observe: 'response',
          params,
        })
        .pipe(catchError(() => of([])))
        .subscribe((data) => resolve(data as HttpResponse<ResourceGroup[]>));
    });
  }

  /**
   * @description 修改ResourceGroup
   * @return Observable<HttpResponse<HttpResponseBase>
   */
  updateResource(
    params: ResourceGroup
  ) {
    return this.http
      .patch<{ msg: '' }>(
        this.ipmApiUrl + serviceUrls.resource + '/' + params.id,
        params,
        {
          headers: this.getHttpOptions().headers,
          observe: 'response',
        }
      )
      .pipe(
        catchError(() =>
          of({ status: 500, headers: this.getHttpOptions().headers, body: { msg: '' } })
        )
      );
  }

  /**
   * @description: 刪除單個外部人員
   * @id 外部人員名單id
   * @return Observable<HttpResponseBase | ErrorStatus>
   */
  delResourceById(id: number): Observable<HttpResponseBase | ErrorStatus> {
    return this.http
      .delete(this.ipmApiUrl + serviceUrls.resource + '/' + id, {
        headers: this.getHttpOptions().headers,
        observe: 'response',
      })
      .pipe(
        catchError(
          this.handleError<HttpResponseBase | ErrorStatus>('delResourceById', {
            status: 401,
          })
        )
      );
  }

  /**
   * @description: 新增Resouce資料
   */
  createResource(params: any): Observable<any> {
    return this.http.post<HttpResponse<HttpResponseBase>>(
      this.ipmApiUrl + serviceUrls.createResource,
      params,
      {
        headers: this.getHttpOptions().headers,
        observe: 'response',
      }
    );
  }

  // --------------open file-----------
  // --------------open file-----------
  // --------------open file-----------
  // --------------open file-----------

  /**
   * @description: 打开文件
   */
  openFile(filePath: string) {
    window.open(this.ipmApiUrl + filePath);
  }
}
