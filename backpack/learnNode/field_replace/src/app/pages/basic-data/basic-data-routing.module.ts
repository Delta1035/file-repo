import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageFocusGuard } from 'src/app/focusGuard/page.focus.guard';
import { BasicDataComponent } from './basic-data.component';

const routes: Routes = [
    {
        path: '',
        component: BasicDataComponent,
        children: [
            {
                path: 'basicDataOrganization',
                loadChildren: () => import('../basic-data-organization/basic-data-organization.module')
                    .then(m => m.BasicDataOrganizationModule),
                canActivate: [PageFocusGuard]
            },
            {
                path: 'basicDataTssCal',
                loadChildren: () => import('../basic-data-tss-cal/basic-data-tss-cal.module')
                    .then(m => m.BasicDataTssCalModule),
                canActivate: [PageFocusGuard]
            },
            {
                path: 'basicDataResourceGroup',
                loadChildren: () => import('../basic-data-resource-group/basic-data-resource-group.module')
                    .then(m => m.BasicDataResourceGroupModule),
                canActivate: [PageFocusGuard]
            },
            {
                path: 'basicDataDivDept',
                loadChildren: () => import('../basic-data-div-dept/basic-data-div-dept.module')
                    .then(m => m.BasicDataDivDeptModule),
                canActivate: [PageFocusGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BasicDataRoutingModule { }
