import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { cloneDeep, isEmpty } from 'lodash';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
//import Data
import { permission, permissions, right } from '@commonDefine/pms/model/permission.model';
import { mainMenu, menusList, subMenu } from '@commonDefine/pms/model/silder-menu';
import { ImpTranslateService } from '@commonService/translate.service';
import { HttpRequestService } from './http.service';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
@Injectable({
  providedIn:'root'
})
export class UtilitiesService {
  constructor(
    private httpRequest: HttpRequestService,
    private msg: ImpTranslateService,
    private http: HttpClient
  ) {}

  // export excel file
  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    // this.saveAsExcelFile(excelBuffer, excelFileName);
    this.handleDownload(excelBuffer, excelFileName);
  }

  handleDownload = async (buffer: BlobPart, fileName: string) => {
    const blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    //@ts-ignore
    const exportFileName = `${fileName}_export_${moment().format(
      'YYYYMMDDTHH-mm'
    )}.xlsx`;
    /* if (window) {
      window.navigator.msSaveBlob(blob, exportFileName);
    } else {
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = exportFileName;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    } */
    FileSaver.saveAs(blob, exportFileName);
  };

  //過濾空參數
  //
  filterParams(obj: any) {
    let pam: any = {};
    for (let i in obj) {
      if (obj[i]) {
        pam[i] = obj[i];
      }
    }
    return pam;
  }
  pajfilterParams(obj: any) {
    let pam: any = {};
    for (let i in obj) {
      if (obj[i]) {
        pam[i] = obj[i];
      } else {
        pam[i] = '';
      }
    }
    return pam;
  }
  createUser(userid: string, useremail: string): Promise<any> {
    const params = {
      url: '/uploader/create_user',
      data: {
        id: userid,
        email: useremail,
        password: '0000',
      },
    };
    return this.httpRequest.doPost(params);
  }

  getAPIToken(userid: string | number): Promise<any> {
    const params = {
      url: '/api-token-auth/',
      data: {
        username: userid,
        password: '0000',
      },
    };
    return this.httpRequest.doPost(params);
  }

  splitFileExt(filepath: string) {
    if (filepath != '') {
      var pos = filepath.replace(/.+\./, '');
      return pos;
    }
    return filepath;
  }

  // Whether all properties of the object are empty
  paramsValidate(params: any, ellipsis: string[] = []) {
    const flag: boolean = true;
    for (const key in params) {
      if (ellipsis.indexOf(key) > -1) {
        continue;
      }
      if (params[key] != '0' && !params[key]) {
        this.msg.error('common.messages.FORMDATANULL');
        return false;
      }
    }
    return flag;
  }

  // 判斷對象是否有空值
  objIsNull(obj: any): boolean {
    let flag = false;
    if (!obj) return (flag = true);
    const keys = Object.keys(obj);
    if (keys.length <= 0) {
      flag = true;
      return flag;
    }

    keys.forEach((item) => {
      if (!this.trim(obj[item])) {
        flag = true;
      }
    });

    return flag;
  }

  trim(str: any) {
    let str1 = str === 0 || str ? str.toString() : '';
    return str1 ? str1.replace(/(^\s*)|(\s*$)/g, '') : str;
  }

  JdueRepeat_4_Array(datas: Array<any>, ...keys: Array<any>) {
    if (isEmpty(datas)) return false
    if (isEmpty(keys)) return
    let result = new Set();
    let repeat = new Set();

    keys.forEach((key: any) => {
      datas.forEach((item) => {
        result.has(item[key]) ? repeat.add(item[key]) : result.add(item[key]);
      });
    });
    return repeat.size > 0;
  }
  // 判斷是否重複
  /*
    data: 需要判斷的數組
    key: 需要判斷的字段
    val: 傳遞需要判斷的字段
  */
  // judeRepet(data: Array<any>, ...key: Array<any>) {
  //   const keys: string[] = [];
  //   const vals: any = [];

  //   if (data.length == 0) {
  //     return false;
  //   }

  //   if (key.length % 2 !== 0) {
  //     throw new Error("The length of key is not even.");
  //   }

  //   key.forEach((item, index) => {
  //     if (index < key.length / 2) {
  //       keys.push(String(item));
  //     } else {
  //       vals.push(typeof item === 'string' ? item.toLowerCase(): item);
  //     }
  //   });
  //   let obj = {};
  //   keys.forEach((item, index) => {
  //     obj = {
  //       ...obj,
  //       [item]: vals[index],
  //     };
  //   });

  //   const objs = Object.keys(obj);

  //   const falg = data.some((item, index) => {
  //     if (objs.length === 1) {
  //       return item[objs[0]] === obj[objs[0]];
  //     } else if (objs.length === 2) {
  //       return item[objs[0]] === obj[objs[0]] && item[objs[1]] === obj[objs[1]];
  //     } else if (objs.length === 3) {
  //       return (
  //         item[objs[0]] === obj[objs[0]] &&
  //         item[objs[1]] === obj[objs[1]] &&
  //         item[objs[2]] === obj[objs[2]]
  //       );
  //     } else if (objs.length === 4) {
  //       return (
  //         item[objs[0]] === obj[objs[0]] &&
  //         item[objs[1]] === obj[objs[1]] &&
  //         item[objs[2]] === obj[objs[2]] &&
  //         item[objs[3]] === obj[objs[3]]
  //       );
  //     } else {
  //       return false;
  //     }
  //   });
  //   return falg;
  // }

  // 對象數組屬性值改成小寫
  objToLowerCase<T>(data: any): T[] {
    const newData = cloneDeep(data);

    for (let obj of newData) {
      // for each loop, iterates over values
      for (let key in obj) {
        // iterates over the keys
        if (typeof obj[key] === 'string') {
          try {
          obj[key] = obj[key].toLowerCase();
        } catch (error) {
          console.log(key,":",typeof obj[key]);
        }
        }
      }
    }

    return newData;
  }

  // 對象數組轉換大寫
  objToUpperCase<T>(data: any): T[] {
    const newData = cloneDeep(data);

    for (let obj of newData) {
      // for each loop, iterates over values
      for (let key in obj) {
        // iterates over the keys
        if (typeof obj[key] === 'string') {
          obj[key] = obj[key].toUpperCase();
        }
      }
    }
    return newData;
  }

  theSameValidate(
    filter: number | string,
    key: string,
    params: any[]
  ): boolean {
    let flag: boolean;
    const COUNTERS = params.filter((param) => {
      return param[key] === filter;
    }).length;
    flag = COUNTERS > 1 ? true : false;
    return flag;
  }

  // 对比两个数组是否相等
  scalarArrayEquals(array1: Array<string>, array2: Array<string>) {
    return (
      array1.length == array2.length &&
      array1.every(function (v, i) {
        return v === array2[i];
      })
    );
  }

  // 對比兩個對象是否相等
  isObjectValueEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
    let aProps = Object.getOwnPropertyNames(obj1);
    let bProps = Object.getOwnPropertyNames(obj2);
    if (aProps.length !== bProps.length) return false;
    for (let prop in obj1) {
      if (obj2.hasOwnProperty(prop)) {
        if (typeof obj1[prop] === 'object') {
          if (!this.isObjectValueEqual(obj1[prop], obj2[prop])) return false;
        } else if (obj1[prop] !== obj2[prop]) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }

  //判断数组是否为空
  arrIsNull<T>(arr: T[]): boolean {
    let flag = false;
    if (!arr) return (flag = true);

    if (arr.length >= 1) {
      return (flag = false);
    }
    return flag;
  }

  // 模糊搜索
  // list: 進行查詢的原始資料
  // keyWord：查詢關鍵字
  // key: 需要對比的欄位
  fuzzySearch<T>(list: T[], key: string, keyWord: string): T[] {
    if(keyWord.trim() === '') return list

    let arr: T[] = [];
    list.forEach((item:any, i) => {
      if (item[key].indexOf(keyWord) >= 0) {
        arr.push(item);
      }
    });
    return arr;
  }

  // 讀取json文件內容
  readyJson(url: string): any {
    let json: any;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data) => {
        json = data;
        return resolve(json);
      });
    });
  }

  getUser(key: string): string {
    return localStorage.getItem(key) || '';
  }

  getUserGruopPower(): number {
    return Number(localStorage.getItem('userGroupPower') || 0);
  }

  public async checkMenuIdentify(p_moduleNameL: string, p_authorize:string, p_userPowerWeight: Number):Promise<boolean>{
    let result = false;
    const authPermissionArr:permission[] = permissions.filter((permission:any) => {
      if (permission.weight === p_userPowerWeight) {
        return permission;
      }
    });
    const authRightArr:right[] = authPermissionArr[0].rights.filter((right:any) =>{
      if(right.itemName === p_moduleNameL){
        return right;
      }
    });
    if (authPermissionArr.length > 0 && authRightArr.length > 0 && authRightArr[0]['itemRight'].indexOf(p_authorize) > -1) {
      result = true;
    }
    return result;
  }

  public async getMenuList(powerWeight: Number): Promise<mainMenu[]>{
    let result: mainMenu[] = [];
    menusList.forEach(async (item:any) => {
      let mainMenu: mainMenu;
      const moduleName = item.authIdentify[0];
      const authorize = item.authIdentify[1];
       if(await this.checkMenuIdentify(moduleName, authorize, powerWeight)){
        let subMenus: subMenu[] = [];
        item.children.forEach(async (childrenItem: any) => {
          let subMenu: subMenu;
          const moduleName_item = childrenItem.authIdentify[0];
          const authorize_item = childrenItem.authIdentify[1];
          if(await this.checkMenuIdentify(moduleName_item, authorize_item, powerWeight)){
            subMenu = {
              name: childrenItem.name,
              path: childrenItem.path,
              i18: childrenItem.i18,
              authIdentify: [moduleName_item, authorize_item]
            }
            subMenus.push(subMenu)
          }
        });
        mainMenu = {
          title : item.title,
          icon: item.icon,
          i18: item.i18,
          authIdentify: [moduleName, authorize],
          children: subMenus
        };
        result.push(mainMenu);
       }
    });
    return result;
  }

  public async getUserGroupPower(userGroupName: string): Promise<string> {
    let userGroupPower = '';
    switch (userGroupName) {
      case 'PMS':
        userGroupPower = '5';
        break;
      case 'IT_ADMIN':
        userGroupPower = '4';
        break;
      case 'IT_PM':
        userGroupPower = '3';
        break;
      case 'IT_LEADER':
        userGroupPower = '2';
        break;
      case 'GUEST':
        userGroupPower = '1';
        break;
      default:
        //Visitor
        userGroupPower = '0';
        break;
    }
    return userGroupPower;
  }

  isOpertion(module?: string) {
    const permission = this.getUserGruopPower();
    if (module == 'baseData') {
      if (
        //permission == 1 ||
        permission == 2 ||
        permission == 3 ||
        permission == 4
      ) {
        return true;
      }
      return false;
    } else if (module == 'projectList') {
      if (
        //permission == 1 ||
        permission == 2 ||
        permission == 3 ||
        permission == 4
      ) {
        return true;
      }
      return false;
    } else if (module == 'prf') {
      if (
        //permission == 1 ||
        permission == 2 ||
        permission == 3 ||
        permission == 4
      ) {
        return true;
      }
      return false;
    } else if (module == 'ib') {
      if (
        //permission == 1 ||
        permission == 2 ||
        permission == 3 ||
        permission == 4
      ) {
        return true;
      }
      return false;
    } else if (module == 'paj') {
      if (
        //permission == 1 ||
        permission == 2 ||
        permission == 3 ||
        permission == 4
      ) {
        return true;
      }
      return false;
    } else if (module == 'pajmonthly') {
      if (
        //permission == 1 ||
        permission == 2 ||
        permission == 3 ||
        permission == 4
      ) {
        return true;
      }
      return false;
    } else if (module == 'pms') {
      if (
        //permission == 1 ||
        permission == 2 ||
        permission == 3 ||
        permission == 4 ||
        permission == 5
      ) {
        return true;
      }
      return false;
    } else if (module == 'check') {
      if (
        //permission == 1 ||
        permission == 2 ||
        permission == 3 ||
        permission == 4
      ) {
        return true;
      }
      return false;
    }
    return false;
  }
}
