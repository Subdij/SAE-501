import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcoleCardFormationComponent } from './ecole-card-formation.component';

describe('EcoleCardFormationComponent', () => {
  let component: EcoleCardFormationComponent;
  let fixture: ComponentFixture<EcoleCardFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcoleCardFormationComponent]
    });
    fixture = TestBed.createComponent(EcoleCardFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
