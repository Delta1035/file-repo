import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-item',
  templateUrl: './ad-item.component.html',
  styleUrls: ['./ad-item.component.scss'],
})
export class AdItemComponent {
  @Input()
  index = 0;
}
