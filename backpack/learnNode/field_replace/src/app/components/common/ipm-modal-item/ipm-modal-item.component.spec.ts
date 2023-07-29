import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpmModalItemComponent } from './ipm-modal-item.component';

describe('IpmModalItemComponent', () => {
  let component: IpmModalItemComponent;
  let fixture: ComponentFixture<IpmModalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpmModalItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpmModalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
