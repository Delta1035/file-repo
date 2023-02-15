import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EditComponent } from './edit/edit.component';
import { DraftComponent } from './draft/draft.component';
import { PreviewComponent } from './preview/preview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { LMarkdownEditorModule } from 'ngx-markdown-editor/src/public_api';

@NgModule({
  declarations: [
    ArticleComponent,
    EditComponent,
    DraftComponent,
    PreviewComponent,
  ],
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    ArticleRoutingModule,
    NzToolTipModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    // LMarkdownEditorModule,
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
  ],
})
export class ArticleModule {}
