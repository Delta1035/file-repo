import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsTodoComponent } from './pms-todo.component';

describe('PmsTodoComponent', () => {
  let component: PmsTodoComponent;
  let fixture: ComponentFixture<PmsTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
