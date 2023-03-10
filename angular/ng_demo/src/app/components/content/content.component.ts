import { AfterContentChecked, AfterContentInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements AfterContentInit,AfterContentChecked{

  name = 'from content';
  @Input()
  menu!: TemplateRef<HTMLElement>;
  @ContentChild('one')
  contentOne: any;
  ngAfterContentInit(): void {
    console.log('ContentComponent ngAfterContentInit',this.contentOne);
    
  }
  ngAfterContentChecked(): void {
    console.log('ContentComponent ngAfterContentChecked',this.contentOne);
  }
}
