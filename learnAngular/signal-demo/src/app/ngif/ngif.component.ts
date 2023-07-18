import { Component } from '@angular/core';

@Component({
  selector: 'app-ngif',
  templateUrl: './ngif.component.html',
  styleUrls: ['./ngif.component.scss'],
})
export class NgifComponent {
  status = false;
  onClickToToggle() {
    this.status = !this.status;
  }
}
