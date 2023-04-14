import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements AfterViewInit {
  @ViewChild('btn')
  btn!: ElementRef<HTMLButtonElement>;

  @ViewChild('btn2')
  btn2!: ElementRef<HTMLButtonElement>;
  ngAfterViewInit(): void {
    this.init();
    this.init2();
  }

  init() {
    const e$ = fromEvent(this.btn.nativeElement, 'click');
    e$.pipe(debounceTime(500)).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  init2() {
    const e$ = fromEvent(this.btn2.nativeElement, 'click');
    e$.pipe(throttleTime(500)).subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
