/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TechProcessComponent } from './tech-process.component';

describe('TechProcessComponent', () => {
  let component: TechProcessComponent;
  let fixture: ComponentFixture<TechProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
