import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpmTabComponent } from './ipm-tab.component';

describe('IpmTabComponent', () => {
  let component: IpmTabComponent;
  let fixture: ComponentFixture<IpmTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpmTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpmTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
