import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchangeFormationComponent } from './echange-formation.component';

describe('EchangeFormationComponent', () => {
  let component: EchangeFormationComponent;
  let fixture: ComponentFixture<EchangeFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchangeFormationComponent]
    });
    fixture = TestBed.createComponent(EchangeFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
