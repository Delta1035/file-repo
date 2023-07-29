import { Injectable } from '@angular/core';
import { ApiResponse } from '@commonDefine/pms/api-response.model';
import { Project } from '@commonDefine/pms/project';
import { Sign } from '@commonDefine/pms/sign';
import { HttpRequestService } from './http.service';

@Injectable({ providedIn: 'root' })
export class SignService {
  constructor(private httpRequest: HttpRequestService) {}
  /**
   * 取得待簽核列表
   *
   * @method public
   * @param email 簽核者電子信箱
   * @param signId 簽核單號
   * @param result 簽核結果
   * @return 回傳新增簽核清單
   */
  getApproveList(
    email: string,
    signId?: String,
    result?: String,
    startDate?: String,
    endDate?: String,
  ): Promise<ApiResponse<Sign>> {
    let queryCondition = '';
    queryCondition = `${queryCondition}&email=${email}`;
    if (signId) {
      queryCondition = `${queryCondition}&signId=${signId}`;
    }
    if (result) {
      queryCondition = `${queryCondition}&result=${result}`;
    }
    if (startDate) {
      queryCondition = `${queryCondition}&startDate=${startDate}`;
    }
    if (endDate) {
      queryCondition = `${queryCondition}&endDate=${endDate}`;
    }
    const params = {
      method: 'get',
      url: '/pms_sign' + (queryCondition ? `?${queryCondition}` : ''),
    };
    //@ts-ignore
    return this.httpRequest.execGet<ApiResponse<Sign>>(params);
  }

  /**
   * 送給長官簽核
   *
   * @method public
   * @param project 專案資料
   * @param remark 備註
   * @return 回傳新增簽核的結果
   */
  submitToApprove(
    project: Project,
    remark: string,
  ): Promise<ApiResponse<any>> {
    const params = {
      url: `/pms_sign/send_to_sign?projectId=${project.id}`,
      data: {
        remark: remark,
      },
    };
    return this.httpRequest.execPost<ApiResponse<any>>(params);
  }

  /**
   * 確定簽核
   *
   * @method public
   * @param id ID
   * @param email 簽核者電子信箱
   * @param result 簽核結果：APPROVED；REJECTED
   * @param remark 簽核者備註
   * @return 回傳簽核的結果
   */
  submitApprove(
    id: number,
    email: string,
    result: string,
    remark: string,
  ): Promise<ApiResponse<any>> {
    const params = {
      url: `/pms_sign/confirm_sign?id=${id}&email=${email}`,
      data: {
        result: result,
        remark: remark,
      },
    };
    return this.httpRequest.execPost<ApiResponse<any>>(params);
  }
}
