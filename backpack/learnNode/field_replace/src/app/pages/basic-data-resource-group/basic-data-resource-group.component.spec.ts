import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataResourceGroupComponent } from './basic-data-resource-group.component';

describe('BasicDataResourceGroupComponent', () => {
  let component: BasicDataResourceGroupComponent;
  let fixture: ComponentFixture<BasicDataResourceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDataResourceGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDataResourceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
