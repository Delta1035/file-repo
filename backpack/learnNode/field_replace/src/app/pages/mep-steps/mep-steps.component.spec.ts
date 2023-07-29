import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MepStepsComponent } from './mep-steps.component';

describe('MepStepsComponent', () => {
  let component: MepStepsComponent;
  let fixture: ComponentFixture<MepStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MepStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MepStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
