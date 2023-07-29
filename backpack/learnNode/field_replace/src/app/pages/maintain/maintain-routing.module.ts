import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageFocusGuard } from 'src/app/focusGuard/page.focus.guard';
import { MaintainComponent } from './maintain.component';

const routes: Routes = [
    {
        path: '',
        component: MaintainComponent,
        children: [
            {
                path: 'maintainRole',
                loadChildren: () => import('../maintain-role/maintain-role.module')
                    .then(m => m.MaintainRoleModule),
                canActivate: [PageFocusGuard]
            }, {
                path: 'maintainPerson',
                loadChildren: () => import('../maintain-person/maintain-person.module')
                    .then(m => m.MaintainPersonModule),
                canActivate: [PageFocusGuard]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintainRoutingModule { }
