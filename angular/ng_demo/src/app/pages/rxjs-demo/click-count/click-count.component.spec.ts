import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickCountComponent } from './click-count.component';

describe('ClickCountComponent', () => {
  let component: ClickCountComponent;
  let fixture: ComponentFixture<ClickCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
