import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { TableHeaderInfo } from '@commonDefine/common.define';
import { UtilitiesService } from '@commonService/pms/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { TableCellInfo } from '@pages/pms-user-management/constant/JIRA_USER_TABLE';
@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit,OnChanges {
  @Input()
  dataSource: any[] = []
  @Input()
  tableHeaders: TableHeaderInfo[] = []
  @Input()
  tableCells: TableCellInfo[] = [];
  @Input()
  operationTemplateRef!: TemplateRef<unknown>;
  @Input()
  isLoading = false;
  @Input()
  exportFileName = 'exportFile';
  @Input()
  isShowDownload = true;
  @Input()
  titleFormRef!:TemplateRef<unknown>;
  @Input()
  nzScroll:{x?:string|null|undefined,y?:string|null|undefined}  = { x: '2000px' }
  @Input()
  isShowPagination = true;
  get isShowTableHeader(){
    return !!this.titleFormRef;
  }
  index = 1;
  size = 10;
  constructor(
    private utils: UtilitiesService,
    public translate: TranslateService,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.dataSource){
      this.resetIndex();
    }
  }
  ngOnInit() {
  }

  pageSizeChange(index: number) {
    console.log('pageSizeChange', index);
  }

  download() {
    let exportDataSource: any[] = this.dataSource.map((obj, index) => {
      const translateData: any = {};
      this.tableHeaders.forEach((head: TableHeaderInfo, _index) => {
        console.log('tableHeader',obj,this.tableCells,this.tableHeaders,_index);
        
        const key = this.translate.instant(head.content);
        let value = '';
        value = key === '#' ? index + 1 : obj[this.tableHeaders[_index].key??''];
        console.log(key, value);
        translateData[key] = value
      })
      return translateData;
    });
    this.utils.exportAsExcelFile(exportDataSource, this.exportFileName);
  };

  trackByIndexFn(index: number, item: any){
    return index;
  }

  // 重置当前页面为第一页
  resetIndex(){
    this.index = 1;
  }
}
