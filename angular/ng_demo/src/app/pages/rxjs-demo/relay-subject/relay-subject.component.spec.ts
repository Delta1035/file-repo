import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelaySubjectComponent } from './relay-subject.component';

describe('RelaySubjectComponent', () => {
  let component: RelaySubjectComponent;
  let fixture: ComponentFixture<RelaySubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelaySubjectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RelaySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
