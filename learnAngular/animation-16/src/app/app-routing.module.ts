import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashbord',
    loadChildren: () =>
      import('./dashbord/dashbord.module').then((m) => m.DashbordModule),
  },
  { path: 'login',loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register',loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
