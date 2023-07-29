import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssReportComponent } from './tss-report.component';

describe('TssReportComponent', () => {
  let component: TssReportComponent;
  let fixture: ComponentFixture<TssReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TssReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
