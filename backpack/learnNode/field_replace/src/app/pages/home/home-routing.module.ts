import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'index',
    }, {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'index',
                loadChildren: () => import('../index/index.module')
                    .then(m => m.IndexModule)
            }, {
                path: 'budget',
                loadChildren: () => import('../budget/budget.module')
                    .then(m => m.BudgetModule),
            }, {
                path: 'tss',
                loadChildren: () => import('../tss/tss.module')
                    .then(m => m.TssModule),
            }, {
                path: 'mep',
                loadChildren: () => import('../mep/mep.module')
                    .then(m => m.MepModule),
            }, {
                path: 'report',
                loadChildren: () => import('../report/report.module')
                    .then(m => m.ReportModule),
            }, {
                path: 'basicData',
                loadChildren: () => import('../basic-data/basic-data.module')
                    .then(m => m.BasicDataModule),
            }, {
                path: 'pms',
                loadChildren: () => import('../pms/pms.module')
                    .then(m => m.PmsModule)
            }, {
                path: 'maintain',
                loadChildren: () => import('../maintain/maintain.module')
                    .then(m => m.MaintainModule),
            }, {
                path: 'noPermissions',
                loadChildren: () => import('../no-permissions/no-permissions.module')
                    .then(m => m.NoPermissionsModule),
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
