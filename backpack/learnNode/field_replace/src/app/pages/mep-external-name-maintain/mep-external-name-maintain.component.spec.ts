import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MepExternalNameMaintainComponent } from './mep-external-name-maintain.component';

describe('MepExternalNameMaintainComponent', () => {
  let component: MepExternalNameMaintainComponent;
  let fixture: ComponentFixture<MepExternalNameMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MepExternalNameMaintainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MepExternalNameMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
