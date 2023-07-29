import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TssMaintainComponent } from './tss-maintain.component';

describe('TssMaintainComponent', () => {
  let component: TssMaintainComponent;
  let fixture: ComponentFixture<TssMaintainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TssMaintainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TssMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
