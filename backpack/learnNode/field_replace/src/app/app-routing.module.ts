import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module')
            .then(m => m.HomeModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
