import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleFormationComponent } from './ecole-formation.component';

describe('EcoleFormationComponent', () => {
  let component: EcoleFormationComponent;
  let fixture: ComponentFixture<EcoleFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcoleFormationComponent]
    });
    fixture = TestBed.createComponent(EcoleFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
