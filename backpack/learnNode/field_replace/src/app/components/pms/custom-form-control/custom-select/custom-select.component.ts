import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '@commonDefine/pms/select-option';
import { CustomFormControlComponent } from '../custom-form-control.component';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements OnInit, ControlValueAccessor, CustomFormControlComponent {
  @Input()
  label = '';
  @Input()
  placeholder = '';
  @Input()
  options: SelectOption[] = []
  @Input()
  labelSpan: number | null = 6; // label所占宽度
  @Input()
  controlSpan: number | null = 14// 控件所占宽度  最大两者之和为24份
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
  writeValue(obj: any): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    // 当调用 FormControl 变更状态的 API 时得表单状态变为 Disabled 时调用 setDisabledState() 方法，以通知自定义表单组件当前表单的读写状态。
    this.isDisabled = isDisabled
  }
  ngOnInit() {
  }
}
