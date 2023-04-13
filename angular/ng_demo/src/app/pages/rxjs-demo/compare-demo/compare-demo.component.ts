import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  auditTime,
  debounceTime,
  fromEvent,
  sampleTime,
  throttleTime,
} from 'rxjs';

@Component({
  selector: 'app-compare-demo',
  templateUrl: './compare-demo.component.html',
  styleUrls: ['./compare-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompareDemoComponent implements AfterViewInit {
  @ViewChild('auditTime')
  auditTime!: ElementRef<HTMLButtonElement>;
  @ViewChild('throttleTime')
  throttleTime!: ElementRef<HTMLButtonElement>;
  @ViewChild('debounceTime')
  debounceTime!: ElementRef<HTMLButtonElement>;
  @ViewChild('sampleTime')
  sampleTime!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit(): void {
    // this.initAuditTimeHandle();
    // this.initThrottleTimeHandle();
    // this.initDebounceTimeHandle();
    this.initSampleTimeHandle();
  }

  initAuditTimeHandle() {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(auditTime(1000));
    result.subscribe((x) => console.log('auditTime' + Date.now()));
  }

  initThrottleTimeHandle() {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(throttleTime(1000));
    result.subscribe((x) => console.log('throttleTime' + Date.now()));
  }

  initDebounceTimeHandle() {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(debounceTime(1000));
    result.subscribe((x) => console.log('debounceTime' + Date.now()));
  }

  initSampleTimeHandle() {
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(sampleTime(1000));
    result.subscribe((x) => console.log('sampleTime' + Date.now()));
  }
}
