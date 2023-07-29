import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPrfComponent } from './budget-prf.component';

describe('BudgetPrfComponent', () => {
  let component: BudgetPrfComponent;
  let fixture: ComponentFixture<BudgetPrfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetPrfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetPrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
