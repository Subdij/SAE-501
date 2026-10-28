import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetsFormationComponent } from './projets-formation.component';

describe('ProjetsFormationComponent', () => {
  let component: ProjetsFormationComponent;
  let fixture: ComponentFixture<ProjetsFormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetsFormationComponent]
    });
    fixture = TestBed.createComponent(ProjetsFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
