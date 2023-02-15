import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ArticleComponent } from './article.component';
import { DraftComponent } from './draft/draft.component';
import { EditComponent } from './edit/edit.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    children: [
      {
        path: 'edit',
        component: EditComponent,
      },
      {
        path: 'draft',
        component: DraftComponent,
      },
      {
        path: 'preview',
        component: PreviewComponent,
      },
      {
        path:'',
        redirectTo:'preview',
        pathMatch:'full'
      }
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
