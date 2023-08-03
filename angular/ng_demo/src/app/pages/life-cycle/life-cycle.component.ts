import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
// class CompanyInfo {
//   companyName: string; // 全部英文字母,最少 8 个字母,最多 32 个字母
//   companyType: CompanyType;
//   setupDate: Date;
//   //不能晚于当天
//   actived: boolean;
//   shares: number;
//   // 最小值为 1, 最大值 100
//   businessAddress: Address;
// }
// class Address {
//   address: string; // 全部英文字符,最多 128 字符
//   phone: string;
//   // 全部英文字符,最多 15 字符
// }
// enum CompanyType {
//   SOLO,
//   CORP,
//   SHARE_HOLD,
// }
/** A hero's name can't match the given regular expression */
export function mustBeforToday(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const targetDay = `${new Date(
      control.value
    ).toLocaleDateString()} 24:00:00`;
    const isBeforToday =
      new Date().getTime() - new Date(targetDay).getTime() < 0;
    return isBeforToday ? { isBeforToday: { value: control.value } } : null;
  };
}

export function mustBoolean(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isBooelan = ['true', 'false', true, false].includes(control.value);
    console.log('isBoolean', isBooelan);
    return !isBooelan ? { isBoolean: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-life-cycle',
  templateUrl: './life-cycle.component.html',
  styleUrls: ['./life-cycle.component.scss'],
})
export class LifeCycleComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      companyName: [
        null,
        [
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(8),
          Validators.maxLength(128),
          Validators.required,
        ],
      ],
      // companyType: [null, [Validators.pattern('[0-2]'), Validators.required]],
      companyType: [null, [Validators.required]],
      setupDate: [null, [mustBeforToday(), Validators.required]],
      // actived: [null, [mustBoolean(), Validators.required]],
      actived: [null, [Validators.required]],
      shares: [
        null,
        [
          Validators.maxLength(100),
          Validators.minLength(10),
          Validators.required,
        ],
      ],
      businessAddress: this.fb.group({
        address: [
          null,
          [
            Validators.maxLength(128),
            Validators.pattern('[a-zA-Z ]*'),
            Validators.required,
          ],
        ],
        phone: [
          null,
          [
            Validators.maxLength(15),
            Validators.pattern('[a-zA-Z ]*'),
            Validators.required,
          ],
        ],
      }),
    });
  }

  handleSubmit() {
    console.log(this.formGroup);
    console.log(this.formGroup.value);
    this.checkFormValid(this.formGroup);
    if (!this.formGroup.valid) {
      alert('校验不通过');
    } else {
      alert('校验通过');
    }
  }

  // 检验表单是否有效
  public checkFormValid(form: AbstractControl | FormGroup | FormArray) {
    if (form.valid) {
      // console.log('checkFormValid', form.value);
    } else {
      if (form instanceof FormGroup) {
        Object.values(form.controls).forEach((control) => {
          if (control instanceof FormArray) {
            control.controls.forEach((control) => {
              this.checkFormValid(control);
            });
          } else if (control instanceof FormGroup) {
            this.checkFormValid(control);
          } else if (control instanceof FormControl) {
            if (control.invalid) {
              console.log('control.invalid', control);
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          }
        });
      }
    }
  }
}
