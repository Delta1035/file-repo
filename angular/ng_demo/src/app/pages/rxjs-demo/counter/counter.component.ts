import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  counterNumber = 20;

  handleClick(vanillaInput:HTMLInputElement){
    this.counterNumber = Number(vanillaInput.value);
  }
}
