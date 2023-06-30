import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Renderer2,
} from '@angular/core';
@Component({
  selector: 'app-three-demo',
  templateUrl: './three-demo.component.html',
  styleUrls: ['./three-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreeDemoComponent implements OnInit, AfterViewInit {
  constructor(private render: Renderer2) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // this.initThree();
  }
}
