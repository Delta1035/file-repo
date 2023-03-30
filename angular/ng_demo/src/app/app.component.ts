/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-02-15 15:04:08
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-03-03 01:30:36
 * @FilePath: \ng_demo\src\app\app.component.ts
 * @Description:
 *
 */
import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { AppConfig, APP_CONFIG } from './token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(@Inject(APP_CONFIG) config: AppConfig) {}
  ngOnInit(): void {}
}
