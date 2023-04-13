import { Directive, HostBinding } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[ngModel]',
})
export class NgModelStatusDirective {
  @HostBinding('class.valid')
  get valid() {
    return this.control.valid;
  }

  @HostBinding('class.inValid')
  get inValid() {
    return this.control.invalid;
  }
  constructor(public control: NgModel) {}
}
