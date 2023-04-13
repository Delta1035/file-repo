import { InjectionToken } from '@angular/core';

/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-03-03 09:02:33
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-03-03 09:02:42
 * @FilePath: \ng_demo\src\app\token.ts
 * @Description:
 *
 */
export interface AppConfig {
  baseUrl: string;
}
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
