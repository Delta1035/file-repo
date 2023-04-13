import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PushComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {}
  @Input()
  person = {
    name: 'from default',
    age: 13,
  };
}
