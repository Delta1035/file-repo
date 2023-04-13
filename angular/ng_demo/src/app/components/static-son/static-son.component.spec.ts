import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticSonComponent } from './static-son.component';

describe('StaticSonComponent', () => {
  let component: StaticSonComponent;
  let fixture: ComponentFixture<StaticSonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaticSonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaticSonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
