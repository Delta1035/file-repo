import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveComponent } from './resolve.component';

describe('ResolveComponent', () => {
  let component: ResolveComponent;
  let fixture: ComponentFixture<ResolveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResolveComponent]
    });
    fixture = TestBed.createComponent(ResolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
