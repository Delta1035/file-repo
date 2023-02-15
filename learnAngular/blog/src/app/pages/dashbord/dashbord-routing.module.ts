import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DraftComponent } from './article/draft/draft.component';
import { EditComponent } from './article/edit/edit.component';
import { PreviewComponent } from './article/preview/preview.component';
import { DashbordComponent } from './dashbord.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: DashbordComponent,
    children: [
      {
        path: 'article',
        loadChildren: () =>
          import('./article/article.module').then((m) => m.ArticleModule),
        data: {
          preload: true,
          // animation: 'ArticlePage'
        }
      },
      {
        path: 'tags',
        loadChildren: () => import('./tag/tag.module').then((m) => m.TagModule),
        data: {
          preload: true,
          // animation: 'TagPage'
        },
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./category/category.module').then((m) => m.CategoryModule),
        data: {
          preload: true,
          // animation: 'CategoryPage'
        },
      },
      {
        path: 'welcome',
        loadChildren: () =>
          import('./welcome/welcome.module').then((m) => m.WelcomeModule),
        data: {
          preload: true,
          // animation: 'WelcomePage'
        },
      },
      {
        path: 'comments',
        loadChildren: () =>
          import('./comment/comment.module').then((m) => m.CommentModule),
        data: {
          preload: true,
          // animation: 'WelcomePage'
        },
      },
      {
        path:'**',
        component:NotFoundComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashbordRoutingModule {}
