import { NgModule } from '@angular/core';
import { DirectiveDemoRoutingModule } from './directive-demo-routing.module';
import { DirectiveDemoComponent } from './directive-demo.component';
import { SharedModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    DirectiveDemoComponent
  ],
  imports: [
    DirectiveDemoRoutingModule,
    SharedModule
  ]
})
export class DirectiveDemoModule { }
