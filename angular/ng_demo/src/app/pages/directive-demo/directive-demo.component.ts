import {
  AfterViewInit,
  Component,
  ComponentRef,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AdItemComponent } from 'src/app/shared/components/ad-item/ad-item.component';
import { PushComponent } from 'src/app/shared/components/push/push.component';
import { AdDirective } from 'src/app/shared/directives/ad.directive';
import { APP_CONFIG, AppConfig } from 'src/app/token';

@Component({
  selector: 'app-directive-demo',
  templateUrl: './directive-demo.component.html',
  styleUrls: ['./directive-demo.component.scss'],
})
export class DirectiveDemoComponent implements OnInit, AfterViewInit {
  addPersonAge() {
    this.person.age++;
  }
  config: AppConfig;
  title = 'ng_demo';
  age = 0;
  fromApp = 1;
  unless = false;
  person = {
    name: 'app name',
    age: 12,
  };
  @ViewChild(AdDirective, { static: true })
  adHost!: AdDirective;
  container!: ViewContainerRef;

  @ViewChild('push')
  push!: ComponentRef<PushComponent>;
  toggle() {
    this.unless = !this.unless;
  }
  constructor(@Inject(APP_CONFIG) config: AppConfig) {
    this.config = config;
  }
  ngAfterViewInit(): void {
    console.log('push', this.push);
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
