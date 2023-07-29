import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataTssCalComponent } from './basic-data-tss-cal.component';

describe('BasicDataTssCalComponent', () => {
  let component: BasicDataTssCalComponent;
  let fixture: ComponentFixture<BasicDataTssCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDataTssCalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDataTssCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
