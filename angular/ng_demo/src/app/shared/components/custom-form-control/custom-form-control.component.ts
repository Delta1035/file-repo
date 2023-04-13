import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-form-control',
  templateUrl: './custom-form-control.component.html',
  styleUrls: ['./custom-form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomFormControlComponent),
      multi: true,
    },
  ],
})
export class CustomFormControlComponent implements ControlValueAccessor {
  @Input()
  _count = 0;

  get count() {
    return this._count;
  }

  set count(value) {
    this._count = value;
    console.log('set count', value);
    this.onChange(this._count);
  }

  onChange = (val: any) => {};
  onTouched = (val: any) => {};
  writeValue(obj: any): void {
    // 更新视图
    /**
     * 任何 FormControl 显式调用 API 的值操作都将调用自定义表单控件的 writeValue() 方法，
     * 并将新值作为参数传入。其作用是设置原生表单控件的值。
     * 数据流向则是从 Angular form ➡️ Native form。
     */
    console.log('write :>>', obj);

    if (obj) {
      this.count = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
}
