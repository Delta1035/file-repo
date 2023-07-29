import { SelectOption } from "@commonDefine/pms/select-option"

export interface CustomFormControlComponent  {

  label: string
  placeholder: string
  options: SelectOption[]
  labelSpan: number// label所占宽度
  controlSpan: number// 控件所占宽度  最大两者之和为24份
  _value: any;
  _onChange: (_: any) => {}
  _onTouch: (_: any) => {}
  isDisabled: boolean;
  setDisabledState(isDisabled: boolean):void;

}
