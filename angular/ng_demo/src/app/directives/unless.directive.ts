import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  private hasView = false;
  @Input()
  set appUnless(condition:boolean){
    if(!condition && !this.hasView){
      this.comtainerRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }else{
      this.comtainerRef.clear();
      this.hasView = false;
    }
  }
  constructor(
    private templateRef:TemplateRef<any>,
    private comtainerRef:ViewContainerRef
  ) { }

}
