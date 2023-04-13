import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appUpload]',
})
export class UploadDirective implements OnInit, AfterViewInit {
  @Input()
  accept: string[] = [];
  @Input()
  multiple = false;
  uploadButton!: HTMLInputElement;
  constructor(
    private viewContainer: ViewContainerRef,
    private el: ElementRef,
    private render: Renderer2,
    private http: HttpClient
  ) {}
  ngAfterViewInit(): void {
    this.uploadButton = document.createElement('input');
    this.uploadButton.type = 'file';
    this.uploadButton.style.display = 'none';
    const el = this.el.nativeElement;
    this.render.appendChild(el, this.uploadButton);
    this.render.listen(this.uploadButton, 'change', (ev: InputEvent) => {
      if (ev.target instanceof HTMLInputElement) {
        const ele = ev.target;
        const file = ele.files?.[0];
        if (file) {
          this.previewFile(file);
          this.uploadImage(file);
        }
      }
    });
  }
  ngOnInit(): void {}

  @HostListener('click')
  onClick() {
    this.uploadButton.click();
  }

  previewFile(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = document.createElement('img');
      img.src = reader.result as string;
      console.log(reader.result);

      this.render.appendChild(this.el.nativeElement, img);
    };
    reader.onerror = () => {
      console.log('读取失败');
    };
  }

  uploadImage(file: File) {
    const fd = new FormData();
    fd.append('imageName', file);
    this.http.post('http://www.baidu.com', fd).subscribe((observer) => {
      console.log('http://www.baidu.com', observer);
    });
  }
}
