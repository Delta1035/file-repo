import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { APP_CONFIG } from './token';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [BrowserModule, AppRoutingModule],
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
