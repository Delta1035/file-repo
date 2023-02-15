import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { NotFoundComponent } from './not-found.component';
const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes', component: HeroListComponent },
  /**
   * full : 出列localhost:port/ , 后面为''
   * prefix : 除了当前路由,后面等于''
   */
  {path:'',redirectTo:'heroes',pathMatch:'full'},
  {path:'**',component:NotFoundComponent},// 路由匹配有先后顺序, 先匹配到了就不会匹配后面的路径, 所以通配符放最后面
];
  // 专门的路由模块
  @NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      /**
       * 一个ExtraOptions配置对象，控制如何执行导航。
       * 使用所有路由器提供程序和指令创建并配置一个模块。可选地设置应用程序侦听器来执行初始导航。
       * 在根目录下注册NgModule时，按如下方式导入:
       */
      enableTracing: true,// <-- 调试目的
    }),
  ],
  exports: [RouterModule],// 导出后才能被AppModule 引入使用
})
export class AppRoutingModule {
}
