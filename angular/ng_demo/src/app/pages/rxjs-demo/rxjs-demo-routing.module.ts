import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RxjsDemoComponent } from './rxjs-demo.component';

const routes: Routes = [
  {
    path: '',
    component: RxjsDemoComponent,
    children: [
      {
        path: '',
        redirectTo: 'counter',
        pathMatch: 'full',
      },
      {
        path: 'snake',
        loadChildren: () =>
          import('./snake/snake.module').then((m) => m.SnakeModule),
      },
      {
        path: 'progress',
        loadChildren: () =>
          import('./progress/progress.module').then((m) => m.ProgressModule),
      },
      {
        path: 'loop',
        loadChildren: () =>
          import('./loop/loop.module').then((m) => m.LoopModule),
      },
      {
        path: 'counter',
        loadChildren: () =>
          import('./counter/counter.module').then((m) => m.CounterModule),
      },
      {
        path: 'replay-subject',
        loadChildren: () =>
          import('./relay-subject/relay-subject.module').then(
            (m) => m.RelaySubjectModule
          ),
      },
      {
        path: 'click-count',
        loadChildren: () =>
          import('./click-count/click-count.module').then(
            (m) => m.ClickCountModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RxjsDemoRoutingModule {}
