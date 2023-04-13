import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareDemoComponent } from './compare-demo.component';

describe('CompareDemoComponent', () => {
  let component: CompareDemoComponent;
  let fixture: ComponentFixture<CompareDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
