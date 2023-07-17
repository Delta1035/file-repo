import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { Route, RouterModule } from '@angular/router';
import { IntroduceComponent } from './about/introduce/introduce.component';
import { HistoryComponent } from './about/history/history.component';
import { ResolveComponent } from './about/resolve/resolve.component';
import { preloadResolver } from './preload.resolver';
const routes: Route[] = [
  {
    path: 'about',
    component: AboutComponent,
    children: [
      {
        path: 'introduce',
        component: IntroduceComponent,
        outlet: 'left',
      },
      {
        path: 'history',
        component: HistoryComponent,
        outlet: 'right',
      },
      {
        path: 'resolve',
        component: ResolveComponent,
        resolve: {
          preloadData: preloadResolver,
        },
      },
    ],
  },
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    IntroduceComponent,
    HistoryComponent,
    ResolveComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
