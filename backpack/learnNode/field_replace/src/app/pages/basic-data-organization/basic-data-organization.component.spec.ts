import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataOrganizationComponent } from './basic-data-organization.component';

describe('BasicDataOrganizationComponent', () => {
  let component: BasicDataOrganizationComponent;
  let fixture: ComponentFixture<BasicDataOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDataOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDataOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
