import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Permission } from '@commonDefine/common.define';
import { TranslateService } from '@ngx-translate/core';
import { filter, isDate, isEmpty, snakeCase } from 'lodash';
import {
  NzNotificationDataOptions,
  NzNotificationService
} from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(
    private notification: NzNotificationService,
    private translate: TranslateService,
    private http: HttpClient
  ) { }

  /**
   * @description: 转换日期为指定的日期字符串
   * @param date 时间对象或者可以转换为时间对象的字符串，不传返回空字符串
   * @param pattern 格式字符串, 默认：yyyyMMdd hh:mm:ss
   * @return string，符合要求的日期字符串
   */
  getFormatDate(date?: any, pattern: string = 'yyyyMMdd hh:mm:ss'): string {
    let operationData: Date = new Date();
    if (date) {
      if (Object.prototype.toString.call(date).slice(8, -1) !== 'Date') {
        operationData = new Date(date);
        if (operationData.toString() === 'Invalid Date') {
          return 'Wrong Time';
        }
      } else {
        operationData = date;
      }
    } else {
      return '';
    }
    const obj: { [key: string]: any } = {
      'M+': operationData.getMonth() + 1,
      'd+': operationData.getDate(),
      'h+': operationData.getHours(),
      'm+': operationData.getMinutes(),
      's+': operationData.getSeconds(),
      'q+': Math.floor((operationData.getMonth() + 3) / 3),
      S: operationData.getMilliseconds(),
    };
    if (/(y+)/.test(pattern)) {
      pattern = pattern.replace(
        RegExp.$1,
        (operationData.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    }
    for (const k in obj) {
      if (new RegExp('(' + k + ')').test(pattern)) {
        pattern = pattern.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? obj[k]
            : ('00' + obj[k]).substr(('' + obj[k]).length)
        );
      }
    }
    return pattern;
  }

  /**
   * @description: 获取localstorage中的值
   * @param key localstorage中的key
   * @return localstorage中的value
   */
  getLocalStorage(key: string): any {
    const target = localStorage.getItem(key);
    if (target) {
      try {
        return JSON.parse(target);
      } catch (err) {
        return target;
      }
    } else {
      return '';
    }
  }

  /**
   * @description: 存储数据到localstorage
   * @param key localstorage中的key
   * @param value localstorage中的key
   * @return void
   */
  setLocalStorage(key: string, value: any): void {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }

  /**
   * @description: 移除localstorage中的数据
   * @param key localstorage中的key
   * @return void
   */
  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * @description: 页面的弹窗提醒
   * @param type 提醒类型
   * @param title 提醒标题
   * @param description 提醒内容描述
   * @param option 提醒相关的一些参数，非必要，参考https://ng.ant.design/components/notification/zh#api
   * @return void
   */
  pagePrompt(
    type: 'success' | 'error' | 'warning',
    title: string,
    description: string = '',
    option?: NzNotificationDataOptions<{}> | undefined
  ): void {
    const titleC = title ? this.translate.instant(title) : '';
    const descriptionC = description ? this.translate.instant(description) : '';
    this.notification.create(type, titleC, descriptionC, option);
  }

  // 检测数据类型的函数
  private static checkedType(target: any) {
    return Object.prototype.toString.call(target).slice(8, -1);
  }

  deepClone(target: any) {
    let result: any;
    let targetType = UtilsService.checkedType(target);
    if (targetType === 'Object') {
      result = {};
    } else if (targetType === 'Array') {
      result = [];
    } else {
      return target;
    }
    for (let i in target) {
      let value = target[i];
      if (
        UtilsService.checkedType(value) === 'Object' ||
        UtilsService.checkedType(value) === 'Array'
      ) {
        result[i] = this.deepClone(value);
      } else {
        result[i] = value;
      }
    }
    return result;
  }

  /**
   * @description: 模糊搜索
   * @param list 進行查詢的原始資料
   * @param keyWord 查詢關鍵字
   * @param key 需要對比的欄位
   * @return 查詢後組成的新數組
   */
  fuzzySearch<T>(list: any, keyWord: string): T[] {
    if (isEmpty(list)) return [];

    return filter(list, (item) => item == keyWord);
  }

  /**
   * @description: 判斷對象是否有空值
   * @param obj 需要判断的对象
   * @return true/false
   */
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

  /**
   * @description 讀取json文件內容
   * @url json文件存放的位置
   * @return Promise<T[]>
   */
  readyJson<T>(url: string): Promise<T[]> {
    let json: any;
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((data) => {
        json = data;
        return resolve(json);
      });
    });
  }

  getObjectKeys(obj: Object) {
    return Object.keys(obj);

  }

  /**
   * @description 自動計算月份最大天數
   * @date 時間(Date類型)
   * @return 天數(number)
   */
  maxDay(date: string | Date): number {
    if (isDate(date)) {
      const currentY = date.getFullYear();
      const currentM = date.getMonth() + 1;
      return new Date(currentY, currentM, 0).getDate();
    }
    const current = new Date(Number(date));
    return new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
  }

  /**
   * @description 设置页面limit大小
   * @return Promise<void>
   */
  setPageSize() {
    return new Promise<void>((resolve, reject) => {
      resolve();
    });
  }

  /**
   *
   * @param value: i18n翻译字符串数组
   * @returns 处理之后的string
   */
  // 搜索框placeholder
  searchPlacehoder(...value: Array<string>) {
    let str = '';
    value.forEach((item) => {
      str += this.translate.instant(item) + '/';
    });
    return str.slice(0, str.length - 1);
  }

  /**
   * @descript 判断数组对象是否有空值
   * @retrun true:没有空值  false:有空值
   */
  objecAtrtIsEmpty(data: any): boolean {
    // 如果是数组，遍历数组里面的
    if (Array.isArray(data)) {
      if (data.length == 0) return false;
      return data.every((el) => {
        return this.objecAtrtIsEmpty(el);
      });
      // 非空数组
    } else if (
      Object.prototype.toString.call(data) === '[object Object]' &&
      JSON.stringify(data) !== '{}'
    ) {
      //对象or对象数组
      return Object.keys(data).every((key) => {
        // 如果对象子元素为数组
        if (Array.isArray(data[key])) {
          if (data[key].length == 0) return false;
          return data[key].every((el: any) => {
            return this.objecAtrtIsEmpty(el);
          });
        } else if (Object.prototype.toString.call(data) === '[object Object]') {
          // 如果0表示不为空的话可以直接用!data
          // 直接用!data,非运算符的话有些值为0的话会被过滤掉
          return data[key] != '' && data[key] != null && data[key] != undefined;
        } else {
          return key != '' && key != null && key != undefined;
        }
      });
    } else if (
      Object.prototype.toString.call(data) === '[object Object]' &&
      JSON.stringify(data) === '{}'
    ) {
      return false;
    } else {
      // 处理单个值
      return data != '' && data != null && data != undefined;
    }
  }

  /**
   * @description 判断页面是否有删除和修改权限
   */
  // 是否有操作权限
  isOperation(permissions: Permission) {
    return permissions.allowedDelete && permissions.allowedUpdate;
  }

  /**
   * @description 生成随机整数
   */
  randomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // 驼峰转下划线
  translateObjectKeyToSnakeCase(obj:any){
    for(const key in obj){
      Object.defineProperty(obj,snakeCase(key),{value:obj[key]})
      delete obj[key];
    }
    return obj;
  }

  // 获取所有控件的值 , 包括 disabled的控件
  getAllControlsValue(controls:{ [key: string]: AbstractControl; }):{[key: string]: any}{
    const control = {};
    for(const key in controls){
      Reflect.defineProperty(control,key,{value:controls[key].value})
    }
    return control;
  }
}
