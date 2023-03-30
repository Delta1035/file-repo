import { NgModule } from '@angular/core';
import { DirectiveDemoRoutingModule } from './directive-demo-routing.module';
import { DirectiveDemoComponent } from './directive-demo.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    DirectiveDemoComponent
  ],
  imports: [
    DirectiveDemoRoutingModule,
    CoreModule
  ]
})
export class DirectiveDemoModule { }
