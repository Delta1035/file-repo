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
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AdItemComponent } from './components/ad-item/ad-item.component';
import { AdDirective } from './directives/ad.directive';
import { AppConfig, APP_CONFIG } from './token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  addPersonAge() {
    this.person.age++;
  }
  config: AppConfig;
  title = 'ng_demo';
  age = 0;
  fromApp: any = 1;
  unless = false;
  person = {
    name: 'app name',
    age: 12,
  };
  @ViewChild(AdDirective, { static: true })
  adHost!: AdDirective;
  container!: ViewContainerRef;
  toggle() {
    this.unless = !this.unless;
  }
  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.config = config;
  }
  ngOnInit(): void {
    setInterval(() => {
      this.age++;
      this.changeAD();
    }, 2500);
  }

  add() {
    this.age++;
  }

  changeAD() {
    this.container = this.adHost.viewContainerRef;
    this.container.clear();
    const instance =
      this.container.createComponent<AdItemComponent>(AdItemComponent).instance;
    instance.index = this.age;
    // 可以加载不同的组件
  }
}
