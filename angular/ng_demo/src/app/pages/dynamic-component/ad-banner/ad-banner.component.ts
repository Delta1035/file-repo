/*
 * @Author: Delta_Zheng Delta_Zheng@wistronits.com
 * @Date: 2023-02-01 17:46:43
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-03-02 23:14:13
 * @FilePath: \ng_demo\src\app\pages\dynamic-component\ad-banner\ad-banner.component.ts
 * @Description:
 *
 */
import { Component, Input, ViewChild } from '@angular/core';
import { AdDirective } from 'src/app/shared/directives/ad.directive';
import { AdComponent } from '../ad-component';

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss'],
})
export class AdBannerComponent {
  @Input() ads: any[] = [];

  currentAdIndex = -1;

  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  interval: number | undefined;

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(
      adItem.component
    );
    componentRef.instance.data = adItem.data;
  }

  getAds() {}
}
