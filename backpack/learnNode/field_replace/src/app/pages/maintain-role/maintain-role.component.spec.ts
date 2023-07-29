import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainRoleComponent } from './maintain-role.component';

describe('MaintainRoleComponent', () => {
  let component: MaintainRoleComponent;
  let fixture: ComponentFixture<MaintainRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
