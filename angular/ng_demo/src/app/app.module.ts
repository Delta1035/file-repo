import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicComponentComponent } from './pages/dynamic-component/dynamic-component.component';
import { AdDirective } from './directives/ad.directive';
import { AdBannerComponent } from './pages/dynamic-component/ad-banner/ad-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponentComponent,
    AdDirective,
    AdBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
