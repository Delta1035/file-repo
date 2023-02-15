import { ElementRef, Injectable } from '@angular/core';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root',
})
export class UtileService {
  constructor() {}

  /**
   * 将字符串转换成dom插入指定容器dom
   * @param text
   * @param dom
   */
  renderStringToDom(text: string, dom: ElementRef<HTMLDivElement>) {
    const clean = DOMPurify.sanitize(text);
    if (dom) {
      dom.nativeElement.innerHTML = marked.parse(clean);
    }
  }
}
