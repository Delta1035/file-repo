import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControlComponent } from '../custom-form-control.component';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements OnInit,ControlValueAccessor,CustomFormControlComponent {
  @Input()
  label = '';
  @Input()
  placeholder = '';
  @Input()
  labelSpan:number | null = 6; // label所占宽度
  @Input()
  controlSpan:number | null = 14// 控件所占宽度  最大两者之和为24份
  _value = '';
  _onChange:any = (_: any) => {}
  _onTouch:any =(_: any)=>{}
  @Input()
  isDisabled = false;
  @Input()
  required = false;
  @Input()
  nzHasFeedback = false;
  @Input()
  control!:any;
  get value(){
    return this._value;
  }
  set value(value:string){
    this._value = value;
    this._onChange(value);
  }
  constructor() {}
  writeValue(obj: any): void {
    // 将表单模型中的新值写入视图或DOM属性（如果需要）的方法，它将来自外部的数据写入到内部的数据模型
    this._value = obj;
  }
  registerOnChange(fn: (_: any) => void): void {
    // 一种注册处理程序的方法，当视图中的某些内容发生更改时应调用该处理程序。
    // 它具有一个告诉其他表单指令和表单控件以更新其值的函数。
    // 通常在 registerOnChange 中需要保存该事件触发函数，在数据改变的时候，可以通过调用事件触发函数通知外部数据变了，同时可以将修改后的数据作为参数传递出去。
    this._onChange = fn;
  }
  registerOnTouched(fn: (_: any) => void): void {
    // 注册 onTouched 事件，基本同 registerOnChange ，只是该函数用于通知表单组件已经处于 touched 状态，改变绑定的 FormControl 的内部状态。
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean){
    // 当调用 FormControl 变更状态的 API 时得表单状态变为 Disabled 时调用 setDisabledState() 方法，以通知自定义表单组件当前表单的读写状态。
    this.isDisabled = isDisabled
  }
  ngOnInit() {}
}
