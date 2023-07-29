import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsUserManagementComponent } from './pms-user-management.component';

describe('PmsUserManagementComponent', () => {
  let component: PmsUserManagementComponent;
  let fixture: ComponentFixture<PmsUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsUserManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
