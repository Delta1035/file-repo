import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataDivDeptComponent } from './basic-data-div-dept.component';

describe('BasicDataResourceGroupComponent', () => {
  let component: BasicDataDivDeptComponent;
  let fixture: ComponentFixture<BasicDataDivDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDataDivDeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDataDivDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
