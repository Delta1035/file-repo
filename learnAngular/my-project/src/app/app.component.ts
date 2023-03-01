/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-01-30 22:18:25
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-02-17 17:49:57
 * @FilePath: \my-project\src\app\app.component.ts
 * @Description:
 *
 */
import { Component } from '@angular/core';
import { routeConfig } from './route-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  isCollapsed = false;
  routeConfig = routeConfig;
}
