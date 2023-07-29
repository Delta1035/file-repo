import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsSOPComponent } from './pms-sop.component';

describe('PmsSOPComponent', () => {
  let component: PmsSOPComponent;
  let fixture: ComponentFixture<PmsSOPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsSOPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsSOPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
