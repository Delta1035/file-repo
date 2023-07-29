import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsStatusReportComponent } from './pms-status-report.component';

describe('PmsStatusReportComponent', () => {
  let component: PmsStatusReportComponent;
  let fixture: ComponentFixture<PmsStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsStatusReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
