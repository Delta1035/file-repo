import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PjButtonGroupType } from './pj-button-group.module';
import { PjProperty } from '../components.global';

@Component({
  selector: 'pj-button-group',
  templateUrl: './pj-button-group.component.html',
  styleUrls: ['./pj-button-group.component.scss'],
  host: { 'class': 'inline-flex' }
})

export class PjButtonGroupComponent {

  @ViewChild('PjButtonGroupDOM') pjButtonGroupDOM: any;

  @Input() buttonGroup!: PjButtonGroupType[];

  @Output() choiceItemChange = new EventEmitter<PjButtonGroupType>();

  private choiceItem?: PjButtonGroupType;

  private transform_X: number = 0;// 滑动距离

  private sliderWidth: number = 0;// 滑块宽度

  visible: boolean = true;

  ngOnInit(): void {
    // 默认项
    if (this.buttonGroup == null || this.buttonGroup.length == 0) {
      this.visible = false;
      return;
    }
    let checkedItem = this.buttonGroup.filter(item => item.checked);
    this.choiceItem = checkedItem.length > 0 ? checkedItem[0] : this.buttonGroup[0];
    const index = this.buttonGroup.findIndex(v => v.value == this.choiceItem!.value);
    if (index != -1) {
      setTimeout(() => {
        this.transform_X = this.calcTransform_X(index);
        this.sliderWidth = this.pjButtonGroupDOM.nativeElement.children[index].getBoundingClientRect().width;
      }, 50);
    }
  }

  // 根据元素位置 计算位移
  calcTransform_X(index: number) {
    let result = 0;
    const children = this.pjButtonGroupDOM.nativeElement.children;
    for (let i = 0; i < index; i++) {
      const element = children[i];
      if (index == 0) {
        result = 0;
        break;
      } else {
        result += Number(getComputedStyle(element).marginRight.replace('px', '')) + element.getBoundingClientRect().width;
      };
    };
    return result;
  }

  selectItem(item: PjButtonGroupType, index: number) {
    this.choiceItem = item;
    const children = this.pjButtonGroupDOM.nativeElement.children;
    this.transform_X = this.calcTransform_X(index);
    this.sliderWidth = children[index].getBoundingClientRect().width;
    this.choiceItemChange.emit(item);
  }

  getClass(item: PjButtonGroupType, i: number): string {
    return (
      (i < (this.buttonGroup.length - 1) ? 'mr-2 ' : '') +
      (this.choiceItem?.value != item.value ? 'brother ' : '') +
      (this.choiceItem?.value == item.value ? 'active ' : '')
    );
  }

  getStyle(): PjProperty {
    return {
      'transform': 'translate(' + this.transform_X + 'px, 0)',
      'width': this.sliderWidth + 'px'
    };
  }

  getLabel(item: PjButtonGroupType): string {
    return item.label;
  }

  getBadgeLabel(item: PjButtonGroupType): string | undefined {
    return item.badgeLabel;
  }

  getChoiceItemLabel(): string {
    return this.choiceItem ? this.choiceItem.label : '';
  }

  getIconName = (item: PjButtonGroupType): string | undefined => item.iconName;

}
