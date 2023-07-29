import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MepBuWiwynnPajComponent } from './mep-bu-wiwynn-paj.component';

describe('MepBuWiwynnPajComponent', () => {
  let component: MepBuWiwynnPajComponent;
  let fixture: ComponentFixture<MepBuWiwynnPajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MepBuWiwynnPajComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MepBuWiwynnPajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
