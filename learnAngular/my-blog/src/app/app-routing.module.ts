import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/dashbord/not-found/not-found.component';

const routes: Routes = [

  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), data: {
      preload: true,
      // animation:'LoginPage'
    }
  },
  {
    path: 'dashbord', loadChildren: () => import('./pages/dashbord/dashbord.module').then(m => m.DashbordModule), data: {
      preload: true,
      animation:'Dashbord'
    }
  },
  // { path: '', pathMatch:'full',redirectTo: 'login' },
  { path: '', pathMatch:'full',redirectTo: 'dashbord' },
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
