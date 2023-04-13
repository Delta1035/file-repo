import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicComponentComponent } from './pages/dynamic-component/dynamic-component.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'rxjs-demo',
  },
  {
    path: 'dynamic-component-demo',
    component: DynamicComponentComponent,
  },
  {
    path: 'rxjs-demo',
    loadChildren: () =>
      import('./pages/rxjs-demo/rxjs-demo.module').then(
        (m) => m.RxjsDemoModule
      ),
  },
  {
    path: 'directive-demo',
    loadChildren: () =>
      import('./pages/directive-demo/directive-demo.module').then(
        (m) => m.DirectiveDemoModule
      ),
  },
  {
    path: 'life-cycle',
    loadChildren: () =>
      import('./pages/life-cycle/life-cycle.module').then(
        (m) => m.LifeCycleModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
