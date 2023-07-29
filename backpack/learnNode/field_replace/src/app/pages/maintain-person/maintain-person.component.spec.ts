import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainPersonComponent } from './maintain-person.component';

describe('MaintainPersonComponent', () => {
  let component: MaintainPersonComponent;
  let fixture: ComponentFixture<MaintainPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
