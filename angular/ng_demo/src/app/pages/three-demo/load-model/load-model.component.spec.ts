import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadModelComponent } from './load-model.component';

describe('LoadModelComponent', () => {
  let component: LoadModelComponent;
  let fixture: ComponentFixture<LoadModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
