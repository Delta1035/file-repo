/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-02-18 00:26:12
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-02-18 00:33:18
 * @FilePath: \my-project\src\app\directives\auto-width-column.directive.ts
 * @Description: 
 * 1. 指令默认指定属性选择器
 * 2. ElementRef 的 nativeElement 属性会提供对宿主 DOM 元素的直接访问权限。
 * 3. @HostListener 监听事件
 * 4. @Input 输入绑定
 * 5. ngNonBindable 停止差值表达式解析,也就是说{{}} 会直接显示出来
 */
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoWidthColumn]'
})
export class AutoWidthColumnDirective {

  constructor(private el:ElementRef) { }

}
