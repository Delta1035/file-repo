import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsDivisionReportComponent } from './pms-division-report.component';

describe('PmsDivisionReportComponent', () => {
  let component: PmsDivisionReportComponent;
  let fixture: ComponentFixture<PmsDivisionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsDivisionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsDivisionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
