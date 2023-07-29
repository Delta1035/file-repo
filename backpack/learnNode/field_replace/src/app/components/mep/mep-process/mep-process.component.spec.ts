import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MepProcessComponent } from './mep-process.component';

describe('MepProcessComponent', () => {
  let component: MepProcessComponent;
  let fixture: ComponentFixture<MepProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MepProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MepProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
