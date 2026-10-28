import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchangeExplanationFormationComponent } from './echange-explanation-formation.component';

describe('EchangeExplanationFormationComponent', () => {
  let component: EchangeExplanationFormationComponent;
  let fixture: ComponentFixture<EchangeExplanationFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchangeExplanationFormationComponent]
    });
    fixture = TestBed.createComponent(EchangeExplanationFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
