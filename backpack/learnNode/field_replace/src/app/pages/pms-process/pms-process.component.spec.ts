import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsProcessComponent } from './pms-process.component';

describe('PmsProcessComponent', () => {
  let component: PmsProcessComponent;
  let fixture: ComponentFixture<PmsProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
