import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstDemoComponent } from './first-demo/first-demo.component';
import { LineComponent } from './line/line.component';
import { LoadModelComponent } from './load-model/load-model.component';
import { TextComponent } from './text/text.component';
import { ThreeDemoComponent } from './three-demo.component';

const routes: Routes = [
  {
    path: '',
    component: ThreeDemoComponent,
    children: [
      {
        path: 'first-demo',
        component: FirstDemoComponent,
      },
      {
        path: 'line',
        component: LineComponent,
      },
      {
        path: 'text',
        component: TextComponent,
      },
      {
        path: 'load-model',
        component: LoadModelComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeDemoRoutingModule {}
