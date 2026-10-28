import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetsCardFormationComponent } from './projets-card-formation.component';

describe('ProjetsCardFormationComponent', () => {
  let component: ProjetsCardFormationComponent;
  let fixture: ComponentFixture<ProjetsCardFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetsCardFormationComponent]
    });
    fixture = TestBed.createComponent(ProjetsCardFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
