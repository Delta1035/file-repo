import { Component, Input, OnInit } from '@angular/core';
/*
    width: 每個card的寬度
    bgColor: 每個card的背景顏色
    lineColor: 每個card下面分割線顏色
    textColor: 每個card字體顏色
    textSize: 每個card字體字號
    fontWeight: 每個card字體粗細
    showLine: 是否顯示每個card下面的分割線
    content: 每個card裡面的主要內容
    path: 路由地址
*/
export interface processList {
  processListContent: any;
  width?: string;
  bgColor?: string;
  lineColor?: string;
  textColor?: string;
  textSize?: string;
  fontWeight?: number | string;
  showLine?: boolean;
  path: string;
  content: string;
}

@Component({
  selector: 'tech-process',
  templateUrl: './tech-process.component.html',
  styleUrls: ['./tech-process.component.scss']
})
export class TechProcessComponent implements OnInit {
  /*
    dataSource: 數據源
    title: 頭部標題
    width: 頭部標題寬度
    lineColor: 頭部標題下面的橫向分割線顏色
    fontSize: 頭部字體的字號
    fontColor: 頭部字體的顏色
    bgColor: 頭部標題的背景顏色
  */
    @Input() dataSource: processList[] = []
    @Input() title: string = ''
    @Input() width: number = 200
    @Input() unit: string = "px"
    @Input() lineColor: string = '#6877CA'
    @Input() fontSize: number = 16
    @Input() fontColor: string = '#fff'
    @Input() fontWeight: number | string = 'bold'
    @Input() bgColor: string = '#3F51B5'

  constructor() { }

  ngOnInit() {
  }

}
