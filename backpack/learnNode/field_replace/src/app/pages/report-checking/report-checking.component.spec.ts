import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCheckingComponent } from './report-checking.component';

describe('ReportCheckingComponent', () => {
  let component: ReportCheckingComponent;
  let fixture: ComponentFixture<ReportCheckingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCheckingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
