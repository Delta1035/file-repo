/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-02-17 14:47:49
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-02-23 11:27:09
 * @FilePath: \my-project\src\app\pages\article\article.component.ts
 * @Description:
 *
 */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { listOfData, listOfThead } from './data/person';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less'],
})
export class ArticleComponent implements OnInit, AfterViewInit {
  listOfData = listOfData;
  listOfThead = listOfThead;
  width = '1000';
  height = '1000';
  isCellScroll = true;
  @ViewChildren('trs')
  trs!: QueryList<ElementRef<HTMLTableRowElement>>;

  constructor(private cd: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
  //  this.handleWidth();
  }

  ngOnInit(): void {
    this.handleOnload();
  }

  toggleCellScroll() {
    this.isCellScroll = !this.isCellScroll;
  }

  handleLoad() {
    console.log('加载');
  }

  handleOnload() {
    console.log('图片加载完成');
    window.onload = this.handleWidth;
  }

  handleUnOnload(){
    window.onunload = ()=>{
      alert('unOnload')
    }
  }

  handleWidth(){
    this.isCellScroll = true;
    let maxWidth = 0;
    let widthList: Array<number>;
    this.trs.forEach((tr: ElementRef<HTMLTableRowElement>) => {
      const tds = tr.nativeElement
        .children as unknown as HTMLTableCellElement[];
      console.log(tds);
      // const tds = tr.nativeElement.children;
      const tdArr = Array.from(tds);
      widthList = new Array(tdArr.length).fill(0);
      const all = tdArr.reduce((preScrollWidth, currentScrollWidth, index) => {
        console.log(currentScrollWidth.scrollWidth);
        if (currentScrollWidth.scrollWidth > widthList[index]) {
          widthList[index] = currentScrollWidth.scrollWidth + currentScrollWidth.offsetWidth-currentScrollWidth.clientWidth;
        }
        return preScrollWidth + currentScrollWidth.scrollWidth;
      }, 0);
      if (all > maxWidth) {
        maxWidth = all;
      }
      console.log(all);
    });
    this.width = maxWidth + '';
    listOfThead.forEach((item, index) => {
      item.width = widthList[index];
    });
    console.log(listOfThead);
    this.cd.detectChanges();
    this.isCellScroll = false;
    this.cd.detectChanges();
  }
}
