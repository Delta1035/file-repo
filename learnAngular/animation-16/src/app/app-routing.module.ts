import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashbord',
    loadChildren: () =>
      import('./dashbord/dashbord.module').then((m) => m.DashbordModule),

    data: {
      animation: 'dashbordPage'
    }
  },
  {
    path: 'login',loadChildren: () => import('./login/login.module').then(m => m.LoginModule),

    data: {
      animation: 'loginPage'
    }
  },
  {
    path: 'register',loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    data: {
      animation: 'registerPage'
    }
  },
  {
    path: 'todo',loadChildren: () => import('./todo/todo.module').then(m => m.TodoModule),
    data: {
      animation: 'todoPage'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
