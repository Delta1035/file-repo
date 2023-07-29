import { Injectable } from '@angular/core';
import { ImpDivision } from '@commonDefine/imp-division.model';
import { Division, QueryDiv } from '@commonDefine/pms/division';
import { cloneDeep } from 'lodash';
import { HttpRequestService } from './http.service';

@Injectable({ providedIn: 'root' })
export class DivisionService {
  constructor(private httpRequest: HttpRequestService) {}

  // 获取division
  async getDivision(): Promise<Division[]> {
    const params = {
      method: 'get',
      url: '/div',
    };
    return this.httpRequest.doGet<Division>(params);
  }

  // 查詢division
  queryDivision(divObject: QueryDiv): Promise<Division[]> {
    const params = {
      url: '/div/query_div',
      data: divObject,
    };
    return this.httpRequest.doPost<Division>(params);
  }

  // 添加division item
  createDivision(obj: Division): Promise<Division[]> {
    const params = {
      url: '/div',
      data: {
        ...obj,
      }
    };
    return this.httpRequest.doPost<Division>(params);
  }

  // 修改division item
  updateDivision(obj: Division): Promise<Division[]> {
    const params = {
      url: '/div/' + obj['id'],
      data: {
        ...obj
      }
    };
    return this.httpRequest.doPut(params)
  }

  // 刪除division item
  removeDivisionById(div_id: number):Promise<Division[]>{
    const params = {
      url: '/div/' + div_id
    }
    return this.httpRequest.doDelete(params)
  }

  async initDataSource(){
    const data = cloneDeep(await this.getDivision())
    return data
  }

    /**
   * 查詢處級單位資料
   *
   * @method public
   * @return 回傳處級單位資料
   */
     find(): Promise<ImpDivision[]> {
      const params = { method: 'get', url: '/div' };
      return this.httpRequest.doGet<ImpDivision>(params);
    }
}
