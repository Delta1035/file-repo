import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicComponentComponent } from './pages/dynamic-component/dynamic-component.component';
import { AdDirective } from './directives/ad.directive';
import { AdBannerComponent } from './pages/dynamic-component/ad-banner/ad-banner.component';
import { StaticComponent } from './components/static/static.component';
import { StaticSonComponent } from './components/static-son/static-son.component';
import { ContentComponent } from './components/content/content.component';
import { APP_CONFIG } from './token';
import { UploadDirective } from './directives/upload.directive';
import { HoverDirective } from './directives/hover.directive';
import { UnlessDirective } from './directives/unless.directive';
import { AdItemComponent } from './components/ad-item/ad-item.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormControlComponent } from './components/custom-form-control/custom-form-control.component';
import { DefaultComponent } from './components/default/default.component';
import { PushComponent } from './components/push/push.component';
import { CoreModule } from './core/core.module';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
  
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: {
        baseUrl: 'http://127.0.0.1',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
