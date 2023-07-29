import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '@commonDefine/pms/select-option';
import { CustomFormControlComponent } from '../custom-form-control-component';

@Component({
  selector: 'app-custom-radio',
  templateUrl: './custom-radio.component.html',
  styleUrls: ['./custom-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomRadioComponent),
      multi: true,
    },
  ],
})
export class CustomRadioComponent implements OnInit, ControlValueAccessor, CustomFormControlComponent {
  @Input()
  label = '';
  @Input()
  placeholder = '';
  @Input()
  options: SelectOption[] = []
  @Input()
  labelSpan = 6; // label所占宽度
  @Input()
  controlSpan = 14// 控件所占宽度  最大两者之和为24份
  _value = '';
  _onChange: any = (_: any) => { }
  _onTouch: any = (_: any) => { }
  @Input()
  isDisabled = false;
  @Input()
  required = false;
  get value() {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
    this._onChange(value);
  }
  constructor() { }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  writeValue(obj: any): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  ngOnInit() {
  }

}
