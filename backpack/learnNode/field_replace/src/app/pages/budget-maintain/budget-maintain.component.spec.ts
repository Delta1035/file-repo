import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMaintainComponent } from './budget-maintain.component';

describe('BudgetMaintainComponent', () => {
  let component: BudgetMaintainComponent;
  let fixture: ComponentFixture<BudgetMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetMaintainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
