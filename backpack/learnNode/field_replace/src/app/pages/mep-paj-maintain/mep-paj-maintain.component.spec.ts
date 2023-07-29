import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MepPajMaintainComponent } from './mep-paj-maintain.component';

describe('MepPajMaintainComponent', () => {
  let component: MepPajMaintainComponent;
  let fixture: ComponentFixture<MepPajMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MepPajMaintainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MepPajMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
