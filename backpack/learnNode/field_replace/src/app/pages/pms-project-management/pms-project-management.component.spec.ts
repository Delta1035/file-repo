import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsProjectManagementComponent } from './pms-project-management.component';

describe('PmsProjectManagementComponent', () => {
  let component: PmsProjectManagementComponent;
  let fixture: ComponentFixture<PmsProjectManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsProjectManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsProjectManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
