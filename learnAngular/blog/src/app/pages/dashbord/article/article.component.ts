import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { routerAnimations } from 'src/app/animation/defaultAnimation';
import { Article } from 'src/app/model/Article.mode';
import { HttpService } from 'src/app/services/http.service';
// export interface Data {
//   id: number;
//   name: string;
//   age: number;
//   address: string;
//   disabled: boolean;
// }
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
  article = ''
  // 表格数据
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Article[] = [];
  listOfCurrentPageData: readonly Article[] = [];
  setOfCheckedId = new Set<number>();
  constructor(
    private httpService: HttpService,
    private cd:ChangeDetectorRef
  ) { }

  getArticle() {
    this.httpService.getArticle().subscribe(article => {
      // console.log(article.data);
      // this.listOfData = [...article.data ?? []]
      // this.cd.detectChanges();
    })
  }


  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Article[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    // const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    // this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    // this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    // this.listOfCurrentPageData
    //   .filter(({ disabled }) => !disabled)
    //   .forEach(({ id }) => this.updateCheckedSet(id, checked));
    // this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  ngOnInit(): void {
    // this.getArticle();
    // this.listOfData = new Array(100).fill(0).map((_, index) => ({
    //   id: index,
    //   name: `Edward King ${index}`,
    //   age: 32,
    //   address: `London, Park Lane no. ${index}`,
    //   disabled: index % 2 === 0
    // }));
    return 
  }
}
