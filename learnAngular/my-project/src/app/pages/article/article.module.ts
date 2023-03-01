/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-02-17 14:47:49
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-02-17 15:09:29
 * @FilePath: \my-project\src\app\pages\article\article.module.ts
 * @Description: 
 * 
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ArticleComponent
  ],
  imports: [
    ArticleRoutingModule,
    CoreModule,
    FormsModule
  ]
})
export class ArticleModule { }
